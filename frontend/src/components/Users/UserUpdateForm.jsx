import { useRef, useContext, useState } from "react";
import { UserContext } from "../Users/UserContext";
import { useNavigate } from "react-router-dom";
import "./UserUpdateForm.css";

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
            navigate("/dashboard");
        };
    };

    return (
        <form className="edit-form" onSubmit={handleOnSubmit}>
            <div className="email-edit-wrapper">
                <label htmlFor="email" className="email-label">E-mail</label>
                <input
                        placeholder="Insert your new email here."
                        aria-label="Email"
                        type="email"
                        name="email"
                        className="email-input"
                        onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <button type="submit" className="edit-btn">Confirm changes</button>
        </form>
    );
};