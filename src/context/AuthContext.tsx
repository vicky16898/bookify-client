import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { User } from "firebase/auth";

type AuthContextType = {
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export function AuthProvider({children} : {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const subscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => subscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}