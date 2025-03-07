import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Users/UserContext";

// some mui icon

export default function LogoutForm () {
    const [user, setUser] = useContext(UserContext);
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    async function handleOnLogout (e) {
        e.preventDefault();
        const result = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!result.ok) {
            throw new Error('Logout failed');
        } else {
            alert("Logout successful");
            localStorage.setItem("token", result.token);
            localStorage.setItem("expirationTime", Date.now());
            setUser(null);
            navigate("/login");
        };
    };

    return (
        <form id="logout-form" onSubmit={handleOnLogout}>
            <div>
                <button type="submit">Logout</button>
            </div>
        </form>
    );
};