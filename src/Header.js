import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

export default function Header() {

    const location = useLocation();
    const { user } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        navigate(value ? `/?search=${value}` : '/');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-10 p-5 flex justify-between items-center bg-white shadow-md max-w-full mx-auto rounded-full">
            <Link to={"/"} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                </div>
                <span className="font-bold text-2xl text-gray-800">Bookify</span>
            </Link>


            {location.pathname === "/" && (
                <div className="flex items-center gap-4 bg-gradient-to-r rounded-xl py-3 px-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <input
                        type="text"
                        placeholder="Search your destination"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="flex-grow bg-white bg-opacity-20 rounded-lg outline-none text-sm text-white placeholder-white placeholder-opacity-70 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:bg-opacity-30 transition-all duration-200"
                    />
                    <div className="bg-white bg-opacity-80 text-blue-500 p-3 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>
            )}



            <Link to={user ? "/account/profile" : "/login"} className="flex items-center gap-3 bg-gray-100 rounded-full py-2 px-4 shadow-md hover:shadow-lg transition-all duration-300">
                {!user ? "Login/Signup" : <div className="w-8 h-8 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>}
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg> */}
                {/* <div className="w-8 h-8 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div> */}
                {!!user && (
                    <div>
                        {user?.name}
                    </div>
                )}
            </Link>

        </header>
    );
}
