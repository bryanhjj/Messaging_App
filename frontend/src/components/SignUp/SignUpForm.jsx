import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// some mui icon

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
            navigate("/login");
        };
    };

    function handleOnChange (e) {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    return(
        <form id="signup-form" onSubmit={handleOnSignUp}>
            <label>
                <span>Username: </span>
                <input
                    placeholder="Insert your username here."
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleOnChange}
                    required
                />
            </label>
            <label>
                <span>E-mail: </span>
                <input
                    placeholder="Insert your email here."
                    aria-label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    required
                />
            </label>
            <label>
                <span>Bio: </span>
                <textarea
                    placeholder="Insert your bio here."
                    rows={ 3 }
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleOnChange}
                />
            </label>
            <label>
                <span>Password: </span>
                <input
                    placeholder="Insert your password here."
                    aria-label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    required
                />
            </label>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    );
};