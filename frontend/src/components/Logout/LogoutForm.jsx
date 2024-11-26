import { useRef, useContext } from "react";
import UserContext from "./UserContext";

// some mui icon

export function LogoutForm () {
    const logoutForm = useRef(null);
    const [user, setUser] = useContext(UserContext);

    async function handleOnLogout (e) {
        e.preventDefault();
        try {
            const formData = new FormData(logoutForm.current);
            const result = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setUser(null);
            if (!result.ok) {
                throw new Error('Logout failed');
            };
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <form id="logout-form" ref={loginForm} onSubmit={handleOnLogout}>
            <div>
                <button type="submit">Logout</button>
            </div>
        </form>
    );
};