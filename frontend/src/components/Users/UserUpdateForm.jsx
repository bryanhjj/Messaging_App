import { useEffect, useState, Form, useLoaderData } from "react";

// get mui stuff in here

export function UserUpdateForm () {
    const { user } = useLoaderData()

    return (
        <Form method="put" id="edit-form">
            <label>
                <span>E-mail: </span>
                <input
                    placeholder="Insert your email here."
                    aria-label="Email"
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                />
            </label>
        </Form>
    );
};