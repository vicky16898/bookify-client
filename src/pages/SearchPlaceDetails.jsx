import React from 'react';

// Custom SVG Icons
const MapMarkerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h0A2.5 2.5 0 0013 5.5V5c0-1.036.392-1.986 1.029-2.671" />
  </svg>
);

const SearchPlaceDetails = ({ place }) => {
  if (!place) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No place selected. Please search and select a location.
      </div>
    );
  }

  // Function to create Google Maps URL
  const getGoogleMapsLink = () => {
    if (place.geometry && place.geometry.location) {
      const { lat, lng } = place.geometry.location;
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.vicinity || place.formatted_address)}`;
  };

  return (
    <div className="container mx-auto max-w-xl p-6 bg-white shadow-lg rounded-xl">
      {/* Place Name */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {place.name}
      </h1>

      {/* Location with Clickable Map Link */}
      <div className="mb-4 text-gray-600">
        <div className="flex items-center">
          <MapMarkerIcon />
          <a 
            href={getGoogleMapsLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg ml-3 hover:text-blue-600 transition duration-300 flex items-center"
          >
            {place.vicinity || place.formatted_address}
            <span className="ml-2 text-sm text-blue-500 hover:underline">
              (Open in Maps)
            </span>
          </a>
        </div>
      </div>

      {/* Business Status */}
      <div className="flex items-center mb-4 text-gray-600">
        <CheckCircleIcon />
        <p className="text-lg ml-3 capitalize">
          Status: {place.business_status?.replace('_', ' ').toLowerCase()}
        </p>
      </div>

      {/* Rating */}
      {place.rating && (
        <div className="flex items-center mb-4 text-gray-700">
          <StarIcon />
          <div className="ml-3">
            <p className="text-lg">
              Rating: {place.rating} 
              <span className="text-sm text-gray-500 ml-2">
                ({place.user_ratings_total} reviews)
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Types */}
      {place.types && (
        <div className="mb-4">
          <div className="flex items-center text-gray-600 mb-2">
            <CompassIcon />
            <p className="text-lg ml-3">Categories</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {place.types.map((type, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Opening Hours */}
      {place.opening_hours && (
        <div className="flex items-center mb-4 text-gray-600">
          <ClockIcon />
          <p className="text-lg ml-3">
            Currently {place.opening_hours.open_now ? 'Open' : 'Closed'}
          </p>
        </div>
      )}

      {/* Contact Information */}
      <div className="space-y-4 mt-6">
        {place.formatted_phone_number && (
          <div className="flex items-center text-gray-600">
            <PhoneIcon />
            <p className="text-lg ml-3">{place.formatted_phone_number}</p>
          </div>
        )}

        {place.website && (
          <div className="flex items-center text-gray-600">
            <GlobeIcon />
            <a 
              href={place.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg text-blue-600 hover:underline ml-3"
            >
              {place.website}
            </a>
          </div>
        )}
      </div>

      {/* Action Button */}
      {place.website && (
        <div className="mt-6 text-center">
          <a 
            href={place.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
          >
            Visit Official Website
          </a>
        </div>
      )}
    </div>
  );
};

export default SearchPlaceDetails;