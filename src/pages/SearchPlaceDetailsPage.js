import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchPlaceDetails from './SearchPlaceDetails';

const SearchPlaceDetailsPage = () => {
    const { placeId } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        // Retrieve search results from localStorage
        const storedResults = localStorage.getItem('searchResults');
        if (storedResults) {
            const results = JSON.parse(storedResults);
            const selectedPlace = results.find(result => result.place_id === placeId);
            setPlace(selectedPlace);
        }
    }, [placeId]);

    return <SearchPlaceDetails place={place} />;
};

export default SearchPlaceDetailsPage;