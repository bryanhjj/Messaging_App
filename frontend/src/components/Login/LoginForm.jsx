import { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from "../Users/UserContext";
import { jwtDecode } from "jwt-decode";
import "./LoginForm.css";

// some mui icon

export default function LoginForm () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser, isAuth, setIsAuth] = useContext(UserContext);
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
                setIsAuth(true);
                const userInfo = jwtDecode(result.token);
                setUser(userInfo.user);
                localStorage.setItem("token", result.token);
                localStorage.setItem("expirationTime", expTime);
                navigate("/dashboard");
            }
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="main">
            <form className="login-form" onSubmit={handleOnLogin}>
                    <input
                            className="user-input"
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            required
                    />
                    <input
                            className="user-input"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                    />
                <div>
                    <button type="submit" className="login-btn">Login</button>
                    <Link to={"/signup"} className="sign-up-link">Don't have an account? Sign up for free!</Link>
                </div>
            </form>
        </div>
    );
};