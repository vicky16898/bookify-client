import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { getRoles } from "@testing-library/react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const baseAPIPath = process.env.API_BASE_PATH || 'http://localhost:4000';

    async function handleLogin() {
        try{
            // const userCreds = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await axios.post(`${baseAPIPath}/login`, {email: email, password: password});
            setUser(userDoc.data);
            navigate('/', {state: {email: email, password: password, role: userDoc.data?.role}});
        } catch (e: any) {
            toast.error("Invalid credentials");
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full border border-gray-300 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        className="w-full border border-gray-300 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full w-full font-semibold transition duration-200 transform hover:scale-105"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-indigo-500 font-semibold hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
