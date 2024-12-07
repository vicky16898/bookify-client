import axios from "axios";
import { ReactNode, useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import { UserContext } from "../UserContext";
import ProfilePage from "./ProfilePage";
import { Link } from "react-router-dom";
import PlaceSearch from './PlaceSearch';

interface Place {
  extraInfo: ReactNode;
  price: ReactNode;
  maxGuests: ReactNode;
  checkOut: ReactNode;
  checkIn: ReactNode;
  title: string;
  address: string;
  description: string;
  photos: string[];
  owner: string;
}

interface User {
  name: string;
  email: string;
  _id: string;
  role: string;
}
interface Location{
  lat: string;
  lng: string;
}

export default function PlacePage() {
  const baseAPIPath =
    process.env.REACT_APP_API_BASE_PATH || "http://localhost:4000";
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [place, setPlace] = useState<Place | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [host, setHost] = useState<User | null>(null);
  const [highlightedPlaces, setHighlightedPlaces] = useState<Set<string>>(
    new Set()
  );
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<Set<string>>(
    new Set()
  );
  const [showOnlyHighlighted, setShowOnlyHighlighted] = useState(false);
  const [searchPlaces, setSearchPlaces] = useState([]);
  const [location, setLocation] = useState<Location | null>(null);

  const handlePlaceSearch = (results: any) => {
    setSearchPlaces(results);
  }


  // Fetch place details
  useEffect(() => {
    if (!id) return;

    axios.get(`${baseAPIPath}/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  // Fetch nearby places using Google Maps API
  useEffect(() => {
    if (!place?.address) return;

    const fetchNearbyPlaces = async () => {
      try {
        const geocodeResponse = await axios.get(`${baseAPIPath}/api/geocode`, {
          params: {
            address: place.address,
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          },
        });

        setLocation(geocodeResponse.data.results[0]?.geometry?.location);
        const tempLocation = geocodeResponse.data.results[0]?.geometry?.location;

        if (tempLocation) {
          const placesResponse = await axios.get(
            `${baseAPIPath}/api/nearbySearch`,
            {
              params: {
                location: `${tempLocation.lat},${tempLocation .lng}`,
                radius: 1500,
                type: "restaurant",
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              },
            }
          );
          console.log("placesResponse", placesResponse.data.results);
          setNearbyPlaces(placesResponse.data.results);
        }
      } catch (error) {
        console.error("Error fetching nearby places:", error);
      }
    };
    fetchNearbyPlaces();
    if (id) {
      fetchUserByPlaceId(id);
    }
  }, [place?.address, id]);

  // Fetch initial bookmarks from API and update highlighted places
  useEffect(() => {
    const fetchBookmarkedPlaces = async () => {
      try {
        const response = await axios.get(`${baseAPIPath}/api/bookmarks`);
        const places = new Set<string>(
          response.data.map((place: { place_id: string }) => place.place_id)
        );
        setBookmarkedPlaces(places);
        setHighlightedPlaces((prev) => {
          const updated = new Set(prev);
          places.forEach((placeId) => updated.add(placeId));
          return updated;
        });
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarkedPlaces();
  }, []);

  const fetchUserByPlaceId = async (placeId: string) => {
    const response = await axios.get(`${baseAPIPath}/api/users/${placeId}`);
    setHost(response.data);
    // return response.data;
  };

  const toggleHighlightAndBookmark = async (placeId: string) => {
    const newHighlightedPlaces = new Set(highlightedPlaces);
    if (newHighlightedPlaces.has(placeId)) {
      newHighlightedPlaces.delete(placeId);
    } else {
      newHighlightedPlaces.add(placeId);
    }
    setHighlightedPlaces(newHighlightedPlaces);

    try {
      if (newHighlightedPlaces.has(placeId)) {
        // Add to bookmarks
        await axios.post(`${baseAPIPath}/api/bookmarks`, { placeId });
        setBookmarkedPlaces((prev) => new Set(prev.add(placeId)));
      } else {
        // Remove from bookmarks
        await axios.delete(`${baseAPIPath}/api/bookmarks/${placeId}`);
        setBookmarkedPlaces((prev) => {
          const updated = new Set(prev);
          updated.delete(placeId);
          return updated;
        });
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };
  // Load highlighted places from localStorage on mount (optional, if you still want to store this information locally)
  useEffect(() => {
    const savedHighlights = localStorage.getItem("highlightedPlaces");
    if (savedHighlights) {
      setHighlightedPlaces(new Set(JSON.parse(savedHighlights)));
    }
  }, []);

  // Save highlighted places to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "highlightedPlaces",
      JSON.stringify(Array.from(highlightedPlaces))
    );
  }, [highlightedPlaces]);

  // Add this function to handle place deletion
  const handleDeletePlace = async () => {
    try {
      await axios.delete(`${baseAPIPath}/api/places/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  if (!place) return null;

  const filteredPlaces = showOnlyHighlighted
    ? nearbyPlaces.filter((nearbyPlace) =>
      highlightedPlaces.has(nearbyPlace.place_id)
    )
    : nearbyPlaces;

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      {host && (host._id !== user?._id) && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xl text-gray-700">
            <h2>Hosted by <span className="font-semibold">{host.name}</span></h2>
          </div>
          <div className="mt-2">
            <Link 
              to={`/host-accommodations/${id}`}
              className="inline-flex items-center text-primary hover:text-primary-dark underline transition duration-200"
            >
              View all accommodations by this host →
            </Link>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />


      <div className="mt-8 mb-8 grid gap-8 grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
      </div>

      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
      {place && (
        <PlaceSearch location={location} />
      )}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl">Nearby Places</h2>
          <button
            className={`px-4 py-2 rounded text-white ${showOnlyHighlighted ? "bg-blue-600" : "bg-gray-600"
              }`}
            onClick={() => setShowOnlyHighlighted(!showOnlyHighlighted)}
          >
            {showOnlyHighlighted ? "Show All Places" : "Show Highlighted Only"}
          </button>
        </div>
        <ul className="mt-4">
          {filteredPlaces.map((nearbyPlace) => (
            <li
              key={nearbyPlace.place_id}
              className={`mb-2 p-3 rounded cursor-pointer ${highlightedPlaces.has(nearbyPlace.place_id)
                  ? "bg-yellow-100 border-2 border-yellow-500"
                  : "bg-white"
                }`}
              onClick={() => toggleHighlightAndBookmark(nearbyPlace.place_id)}
            >
              <strong>{nearbyPlace.name}</strong> - {nearbyPlace.vicinity}
            </li>
          ))}
        </ul>
      </div>
      <br />
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-4xl mx-auto">
        {user?.role === "admin" ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <BookingWidget place={place} />
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleDeletePlace}
                className="bg-red-500 text-white px-4 py-2 rounded-2xl"
              >
                Delete Place
              </button>
            </div>
          </div>
        ) : user?._id === place.owner ? (
          <button
            onClick={handleDeletePlace}
            className="bg-red-500 text-white px-4 py-2 rounded-2xl"
          >
            Delete Place
          </button>
        ) : (
          <BookingWidget place={place} />
        )}
      </div>
      <br />
    </div>
  );
}
