import { createContext, useEffect, useState } from "react";
import axios from "axios";
type User = {
  role: string;
  email: string;
  _id: string;
  password: string;
  name: string;
};

type userContextType = {
  user: User | null;
  setUser: (user: any) => void;
  loading: boolean;
};

export const UserContext = createContext<userContextType>({
  user: null,
  setUser: () => {},
  loading: false,
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      // setLoading(true);
      axios.get("/profile").then(({data}) => {
        setUser(data);
        setLoading(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
