import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import axios from 'axios';
import { MdSearch } from 'react-icons/md';

const PlaceSearch = ({ location }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [radius, setRadius] = useState(1500);
    const navigate = useNavigate();
    const baseAPIPath = process.env.REACT_APP_API_BASE_PATH || "http://localhost:4000";
    const typeMapping = {
        restaurant: 'restaurant',
        hotel: 'lodging',
        bar: 'bar',
        cafe: 'cafe',
        hospital: 'hospital',
        pharmacy: 'pharmacy',
        school: 'school',
        university: 'university',
        gym: 'gym',
        park: 'park',
        supermarket: 'supermarket',
        movie_theater: 'movie_theater',
        bank: 'bank',
        atm: 'atm',
        library: 'library',
        shopping_mall: 'shopping_mall',
        bakery: 'bakery',
        spa: 'spa',
        zoo: 'zoo',
        gas_station: 'gas_station',
        courthouse: 'courthouse',
        police: 'police',
        airport: 'airport',
        train_station: 'train_station',
        subway_station: 'subway_station',
        bus_station: 'bus_station',
        church: 'church',
        temple: 'place_of_worship',
        mosque: 'place_of_worship',
        art_gallery: 'art_gallery',
        museum: 'museum',
        beach: 'beach',
        nightlife: 'night_club',
        ice_cream_shop: 'ice_cream_shop',
        book_store: 'book_store',
        pet_store: 'pet_store',
        fast_food: 'fast_food',
        convenience_store: 'convenience_store',
        florist: 'florist',
        dentist: 'dentist',
        doctor: 'doctor',
        veterinarian: 'veterinarian',
        car_dealer: 'car_dealer',
        car_rental: 'car_rental',
        travel_agency: 'travel_agency',
        liquor_store: 'liquor_store',
        car_wash: 'car_wash',
        furniture_store: 'furniture_store',
        home_goods_store: 'home_goods_store',
    };


    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;

        // Normalize the input to lowercase and map it to a Google Maps API type
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();
        const mappedType = typeMapping[normalizedSearchTerm] || 'establishment'; // Default to 'establishment' if no match

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${baseAPIPath}/api/nearbySearch`, {
                params: {
                    location: `${location.lat},${location.lng}`,
                    radius: radius,
                    type: mappedType,
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                },
            });

            if (response.data.status === 'OK') {
                setSearchResults(response.data.results);
                localStorage.setItem('searchResults', JSON.stringify(response.data.results));
            } else if (response.data.status === 'ZERO_RESULTS') {
                setSearchResults([]);
                localStorage.setItem('searchResults', JSON.stringify([]));
                setError('No results found for your search.');
            } else if (response.data.error) {
                setError(response.data.error);
            } else {
                setError('An unexpected error occurred.');
            }
        } catch (error) {
            setError(error.message);
            console.error('Error searching places:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const storedResults = localStorage.getItem('searchResults');
        if (storedResults) {
            setSearchResults(JSON.parse(storedResults));
        }
    }, []);

    const handlePlaceClick = (place) => {
        navigate(`/search-place/${place.place_id}`);
    };

    return (
        <div className="mb-6">
            <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative w-full mr-4">
                    <input
                        type="text"
                        placeholder="Search for places..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <MdSearch className="absolute top-1/2 left-0.5 transform -translate-y-1/3 text-gray-500" />
                </div>
                <div className="flex items-center">
                    <input
                        type="number"
                        value={radius}
                        onChange={(e) => setRadius(parseInt(e.target.value, 10) || 1500)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md mx-2"
                        min="1"
                        max="50000"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>
            {error && <div className="mt-2 text-red-500">Error: {error}</div>}
            {searchResults.length > 0 && (
                <div className="mt-4">
                    <h2>Search Results:</h2>
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result.place_id} className="mb-2 cursor-pointer" onClick={() => handlePlaceClick(result)}>
                                <a>
                                    {result.formatted_address
                                        ? `${result.name} - ${result.formatted_address}`
                                        : result.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PlaceSearch;
