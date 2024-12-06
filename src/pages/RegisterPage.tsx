import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile , deleteUser} from "firebase/auth";
import toast from "react-hot-toast";
import axios from 'axios';




export default function RegisterPage() {

    const [name,setName] = useState('');
    const [role, setRole] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const baseAPIPath = process.env.API_BASE_PATH || 'http://localhost:4000';

    useEffect(() => {
        console.log(role);
    }, [role]);


    async function registerUser() {
        try{
            await axios.post(`${baseAPIPath}/register`, {name : name, email: email, password: password, role: role});
            
            navigate('/login', {state: {email: email, password: password, role: role}});
        } catch (e: any) {
            toast.error(e.response.data.error);
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create an Account</h1>
                <form onSubmit={registerUser} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border border-gray-300 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full border border-gray-300 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <select 
                        value={role} 
                        className="w-full border border-gray-300 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        <option value="guest">Guest</option>
                        <option value="host">Host</option>
                    </select>
                    <button
                        type="button"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full w-full font-semibold transition duration-200 transform hover:scale-105"
                        onClick={registerUser}
                    >
                        Register
                    </button>
                </form>
                <div className="text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-500 font-semibold hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}