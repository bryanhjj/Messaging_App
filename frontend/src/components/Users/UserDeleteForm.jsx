import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Users/UserContext";
import "./UserDeleteForm.css";

export default function UserDeleteForm () {
    const navigate = useNavigate();
    const [user] = useContext(UserContext);
    const token = localStorage.getItem("token");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const result = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!result.ok) {
            throw new Error('Unexpected error');
        } else {
            alert("Account deletion successful.");
            localStorage.setItem("token", null);
            localStorage.setItem("expirationTime", Date.now());
            navigate("/");
        };
    };

    return (
        <form onSubmit={handleOnSubmit} className="delete-container">
            <h2 className="warning-msg">Are you certain that you want to delete your account?</h2>
            <div>
                <button type="submit" className="yes-btn">YES</button>
                <button type="button" onClick={() => {navigate(-1);} } className="no-btn">NO</button>
            </div>
        </form>
    );
};