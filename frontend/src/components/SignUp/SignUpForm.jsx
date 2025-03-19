import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

export default function SignUpForm () {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        bio: "",
        password: ""
    });
    const navigate = useNavigate();

    async function handleOnSignUp (e) {
        e.preventDefault();
        const result = await fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                bio: formData.bio,
                password: formData.password
            }),
        });
        if (!result.ok) {
            throw new Error('Registration failed');
        } else {
            alert("User registered successfully!");
            navigate("/");
        };
    };

    function handleOnChange (e) {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    return(
        <form className="signup-form" onSubmit={handleOnSignUp}>
            <input
                placeholder="Username"
                type="text"
                id="username"
                name="username"
                className="signup-input"
                value={formData.username}
                onChange={handleOnChange}
                required
            />
            <input
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                className="signup-input"
                value={formData.email}
                onChange={handleOnChange}
                required
            />
            <textarea
                placeholder="Bio"
                rows={ 3 }
                id="bio"
                name="bio"
                className="signup-textarea"
                value={formData.bio}
                onChange={handleOnChange}
            />
            <input
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                className="signup-input"
                value={formData.password}
                onChange={handleOnChange}
                required
            />
            <button type="submit" className="signup-btn">Sign Up</button>
        </form>
    );
};