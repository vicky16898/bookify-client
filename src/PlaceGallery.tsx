import React, { useState } from "react";

export default function PlaceGallery({ place }: { place: any }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const baseAPIPath = process.env.REACT_APP_API_BASE_PATH || "http://localhost:4000";
    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen z-50">
                <div className="bg-black p-8 grid gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl">Photos of {place.title}</h2>
                        <button
                            onClick={() => setShowAllPhotos(false)}
                            className="flex items-center gap-2 py-2 px-4 rounded-2xl shadow bg-white text-black"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {place.photos?.map((photo: string, index: number) => (
                            <div key={index} className="aspect-square">
                                <img
                                    className="w-full h-full object-cover rounded-lg"
                                    src={`${baseAPIPath}/uploads/${photo}`}
                                    alt={`Photo ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div className="h-full">
                    {place.photos?.[0] && (
                        <img
                            onClick={() => setShowAllPhotos(true)}
                            className="w-full h-full cursor-pointer object-cover rounded-lg"
                            src={`${baseAPIPath}/uploads/${place.photos[0]}`}
                            alt="Main photo"
                        />
                    )}
                </div>
                <div className="grid grid-rows-2 gap-2">
                    {place.photos?.[1] && (
                        <img
                            onClick={() => setShowAllPhotos(true)}
                            className="w-full h-full cursor-pointer object-cover rounded-lg"
                            src={`${baseAPIPath}/uploads/${place.photos[1]}`}
                            alt="Second photo"
                        />
                    )}
                    {place.photos?.[2] && (
                        <img
                            onClick={() => setShowAllPhotos(true)}
                            className="w-full h-full cursor-pointer object-cover rounded-lg"
                            src={`${baseAPIPath}/uploads/${place.photos[2]}`}
                            alt="Third photo"
                        />
                    )}
                </div>
            </div>
            {place.photos?.length > 3 && (
                <button
                    onClick={() => setShowAllPhotos(true)}
                    className="absolute bottom-4 right-4 py-2 px-4 bg-white rounded-2xl shadow-lg flex items-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Show more photos
                </button>
            )}
        </div>
    );
}
