import { useLocation, Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserContext } from "../UserContext";
import { ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";

export default function HostAccommodations() {


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
    _id: string;
  }

  interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
  }

  const { id } = useParams();


  const [places, setPlaces] = useState<Place[]>([]);
  const location = useLocation();
  const baseAPIPath =
    process.env.REACT_APP_API_BASE_PATH || "http://localhost:4000";

  const { user } = useContext(UserContext);
  const [host, setHost] = useState<User | null>(null);


  const getHost = async () => {
    const response = await axios.get(`${baseAPIPath}/api/users/${id}`);
    setHost(response.data);
  };

  console.log("host?._id", host?._id);

  const getUserPlaces = async (id: string) => {
    const response = await axios.get(`${baseAPIPath}/api/users/places/${id}`);
    console.log("response.data", response.data);
    setPlaces(response.data);
  };

  const { state } = useLocation();

  useEffect(() => {
    getHost();
  }, []);

  useEffect(() => {
      if (host?._id) {
        getUserPlaces(host._id);
      }
  }, [host]);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={`${baseAPIPath}/uploads/` + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-black-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}
