import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const Context = ({children}) => {
    const [user, setUser] = useState(() => ({
        loggedIn: false,
    }));

    useEffect(() => {
        fetch(`${API_URL}/auth/user`, { credentials: "include" })
        .then(r => r.json())
        .then(data => {
            setUser(...data);
        });
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default Context;