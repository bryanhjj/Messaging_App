import { useEffect, useState, Form, useLoaderData } from "react";

// some mui icon

export function LoginForm () {
    return (
        <Form>
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
        </Form>
    );
};