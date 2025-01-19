import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? true : false;
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const expirationTime = localStorage.getItem("expirationTime");
        if (token && expirationTime) {
            if (Date.now() > expirationTime) {
                setIsAuth(false);
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpirationTime');
            } else {
                try {
                    const userInfo = jwtDecode(token);
                    setUser(userInfo.user);
                    setIsAuth(true);
                } catch(err) {
                    console.log(err);
                }
            }
        }
    }, []);

    return (
        <UserContext.Provider value={[user, setUser, isAuth, setIsAuth]}>
            {children}
        </UserContext.Provider>
    );
};
