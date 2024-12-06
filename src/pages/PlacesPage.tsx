// import React from 'react';
// import { Typography, Container, Paper } from '@mui/material';

// export default function MyAccommodations() {
//   return (
//     <Container maxWidth="md" sx={{ mt: 5 }}>
//       <Paper sx={{ p: 4, textAlign: 'center' }}>
//         <Typography variant="h4" gutterBottom>
//           My Accommodations
//         </Typography>
//         <Typography color="text.secondary">
//           Here you can manage your accommodations.
//         </Typography>
//         {/* Add accommodations list component here */}
//       </Paper>
//     </Container>
//   );
// } 

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PlaceImg from "../PlaceImg";
export const REMOTE_SERVER = process.env.REACT_APP_API_BASE_PATH
export default function PlacesPage() {
    const [places, setPlaces] = useState<{ _id:string, title: string, description: string, photos: string[] }[]>([]);
    useEffect(() => {
        axios.get('/user-places', {
            withCredentials: true
        }).then(({ data }) => {
            setPlaces(data);
        })
    }, []);
    return (

        <div>
            <div className="text-center">
                <Link className="inline-flex text-white" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/'+place._id} className="mt-4 flex cursor-pointer gap-4 bg-gray-100 p-2 rounded-2xl">
                        <div className="w-32 h-32 bg-gray-300 shrink-0">
                            <PlaceImg place={place} />
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    )
}