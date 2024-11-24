import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/auth/user`, { credentials: "include" })
        .then(r => r.json())
        .then(data => {
            setUser(...data);
        });
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;