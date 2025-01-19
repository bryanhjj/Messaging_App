import { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from "../Users/UserContext";

// some mui icon

export default function LoginForm () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const {user, setUser, isAuth, setIsAuth} = useContext(UserContext);
    const navigate = useNavigate();

    async function handleOnLogin (e) {
        e.preventDefault();
        const authTimer = 1000 * 60 * 60 * 10;
        const expTime = Date.now() + authTimer;
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const result = await response.json();
                localStorage.setItem("token", result.token);
                localStorage.setItem("expirationTime", expTime);
                navigate("/");
            }
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <form id="login-form" onSubmit={handleOnLogin}>
            <label>
                <span>Email: </span>
                <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                />
            </label>
            <label>
                <span>Password: </span>
                <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                />
            </label>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    );
};