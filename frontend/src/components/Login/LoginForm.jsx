import { useRef, useContext } from "react";
import UserContext from "../Users/UserContext";

// some mui icon

export default function LoginForm () {
    const loginForm = useRef(null);
    const [user, setUser] = useContext(UserContext);

    async function handleOnLogin (e) {
        e.preventDefault();
        try {
            const formData = new FormData(loginForm.current);
            const result = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "x-www-form-urlencoded",
                },
                body: JSON.stringify(formData),
            });
            setUser(result); // look into what's returned to us from the API and work from there
            if (!result.ok) {
                throw new Error('Login failed');
            };
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <form id="login-form" ref={loginForm} onSubmit={handleOnLogin}>
            <label>
                <span>Email: </span>
                <input
                        placeholder="Insert your email here."
                        aria-label="Email"
                        type="email"
                        name="email"
                />
            </label>
            <label>
                <span>Password: </span>
                <input
                        placeholder="Insert your password here."
                        aria-label="Password"
                        type="password"
                        name="password"
                />
            </label>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    );
};