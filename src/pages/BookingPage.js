import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find((booking) => booking._id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    const deleteBooking = async () => {
        await axios.delete(`/bookings/${id}`);
        navigate('/account/bookings');
    }

    return (
        <div>
            
            <div className="my-8">
                <h1 className="text-3xl">{booking.place.title}</h1>
                <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
                <div className="bg-gray-200 p-6 my-4 rounded-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl mb-4"> Your booking information:</h2>
                        <BookingDates booking={booking} className={undefined} />
                    </div>
                    <div className="bg-primary p-6 text-white rounded-2xl">
                        <div>Total Price</div>
                        <div className="text-3xl">${booking.price}</div>
                    </div>

                </div>
                
                <PlaceGallery place={booking.place} />
            </div>
           
        </div>
    )
};