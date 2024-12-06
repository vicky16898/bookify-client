import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router";

export default function PlacesFormPage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        if (id === 'new') {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);

        })
    }, [id]);
    function inputHeader(text: string | number) {
        return <h2 className="text-xl mt-4">{text}</h2>
    }

    async function savePlace(ev: any) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        };

        if (id === 'new') {
            await axios.post('/places', placeData);
        } else {
            await axios.put('/places', {
                id, ...placeData

            });
        }

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/accommodations'} />
    }

    return (<div className="flex justify-center items-center" >
        <div className="justify-center bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
            <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Accommodation</h3>
            <form onSubmit={savePlace}>
                {inputHeader('Title')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"
                    placeholder="Enter a catchy title"></input>
                {inputHeader('Address')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"
                    placeholder="Enter address of your place"></input>
                {inputHeader('Description')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"
                    placeholder="Enter description of your place"></textarea>
                {inputHeader('Perks')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {inputHeader('Timings & Guests')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-5">Check-in time</h3><br />
                        <input type="time" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                            className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1" placeholder="6:00AM"></input>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-5">Check-out time</h3><br />
                        <input type="time" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                            className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"></input>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-5">Max guests</h3><br />
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(Number(ev.target.value))}
                            className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"></input>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-5">Price per night</h3><br />
                        <input type="number" value={price} onChange={ev => setPrice(Number(ev.target.value))}
                            className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1"></input>
                    </div>
                </div>
                {inputHeader('Photos')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {inputHeader('Additional Information')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}
                    className="bg-gray-200 text-black rounded max-w-4xl py-2 px-4 w-full mt-1" placeholder="Enter additional Information"></textarea>
                <div>
                    <button className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full w-full font-semibold transition duration-200 transform hover:scale-105">Save</button>
                </div>
            </form>
        </div>
    </div>)
}