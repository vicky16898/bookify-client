
import AccountPage from "./AccountPage";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
    interface Booking {
        _id: string;
        place: {
            title: string;
        };
        price: number;
    }

    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);

    return (
        <div>
            {/* <AccountPage /> */}
            <div>
                {bookings?.length > 0 &&
                    bookings.map((booking) => (
                        <Link
                            to={`/account/bookings/${booking._id}`}
                            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-5"
                            key={booking._id}
                        >
                            <div className="w-48">
                                <PlaceImg place={booking.place} />
                            </div>
                            <div className="py-3 pr-3 grow">
                                <h2 className="text-xl">{booking.place.title}</h2>

                                <div className="text-xl">
                                    <BookingDates
                                        booking={booking}
                                        className="mb-2 mt-4 text-gray-500"
                                    />
                                    <div className="flex gap-1 text-xl">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-8 w-8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                                            />
                                        </svg>
                                        <span className="text-2xl">
                                            Total Price: ${booking.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
