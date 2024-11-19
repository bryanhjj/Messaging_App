import { useEffect, useState, Form, useLoaderData } from "react";

// some mui icon

export function SignUpForm () {
    const { signUpUser } = useLoaderData();

    return(
        <Form method="post" id="signup-form">
            <label>
                <span>Username: </span>
                <input
                    placeholder="Insert your username here."
                    aria-label="Username"
                    type="text"
                    name="username"
                    defaultValue={ signUpUser?.username }
                />
            </label>
            <label>
                <span>E-mail: </span>
                <input
                    placeholder="Insert your email here."
                    aria-label="Email"
                    type="email"
                    name="email"
                    defaultValue={ signUpUser?.email }
                />
            </label>
            <label>
                <span>Bio: </span>
                <textarea
                    placeholder="Insert your bio here."
                    rows={ 3 }
                    name="bio"
                    defaultValue={ signUpUser?.bio }
                />
            </label>
            <label>
                <span>Password: </span>
                <input
                    placeholder="Insert your password here."
                    aria-label="Password"
                    type="text"
                    name="password"
                />
            </label>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </Form>
    );
};