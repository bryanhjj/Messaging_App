import { useEffect, useState, Form, useLoaderData, useRef } from "react";

// some mui icon

export function LoginForm () {
    const loginForm = useRef(null);

    async function handleOnLogin (e) {
        e.preventDefault();
        try {
            const formData = new FormData(loginForm.current);
            const result = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
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