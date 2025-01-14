import { useEffect, useState, useRef } from "react";

// some mui icon

export default function SignUpForm () {
    const signUpForm = useRef(null);

    async function handleOnSignUp (e) {
        e.preventDefault();
        try {
            const formData = new FormData(signUpForm.current);
            const result = await fetch(`${API_URL}/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!result.ok) {
                throw new Error('Registration failed');
            };
        } catch(err) {
            console.log(err); // get better error handling
        }
    };

    return(
        <form id="signup-form" onSubmit={handleOnSignUp} ref={signUpForm}>
            <label>
                <span>Username: </span>
                <input
                    placeholder="Insert your username here."
                    aria-label="Username"
                    type="text"
                    name="username"
                />
            </label>
            <label>
                <span>E-mail: </span>
                <input
                    placeholder="Insert your email here."
                    aria-label="Email"
                    type="email"
                    name="email"
                />
            </label>
            <label>
                <span>Bio: </span>
                <textarea
                    placeholder="Insert your bio here."
                    rows={ 3 }
                    name="bio"
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
                <button type="submit">Sign Up</button>
            </div>
        </form>
    );
};