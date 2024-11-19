import { useEffect, useState, Form } from "react";

// some mui icon

export function SignUpForm () {

    return(
        <Form method="post" id="signup-form">
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
        </Form>
    );
};