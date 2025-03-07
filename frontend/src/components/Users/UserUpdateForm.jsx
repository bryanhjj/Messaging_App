import { useRef, useContext, useState } from "react";
import { UserContext } from "../Users/UserContext";
import { useNavigate } from "react-router-dom";

// get mui stuff in here

export default function UserUpdateForm () {
    const [ input, setInput ] = useState("");
    const [ user ] = useContext(UserContext);
    const updateForm = useRef(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const result = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: input,
            }),
        });
        if (!result.ok) {
            throw new Error('Update failed');
        } else {
            alert("Profile has been successfully updated.");
            navigate("/");
        };
    };

    return (
        <form id="edit-form" onSubmit={handleOnSubmit}>
            <label for="email">E-mail:</label>
            <input
                    placeholder="Insert your email here."
                    aria-label="Email"
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Confirm changes</button>
        </form>
    );
};