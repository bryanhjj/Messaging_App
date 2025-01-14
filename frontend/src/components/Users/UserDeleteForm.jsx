import { useNavigate, useContext } from "react";
import UserContext from "./UserContext";

// get mui stuff in here

export default function UserDeleteForm () {
    const navigate = useNavigate();
    const [user] = useContext(UserContext);

    const handleOnSubmit = async() => {
        try {
            const result = await fetch(`${API_URL}/users/${user.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!result.ok) {
                throw new Error('Unexpected error');
            };
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <h2>Are you certain that you want to delete your account?</h2>
            <button type="submit">YES</button>
            <button type="button" onClick={() => {navigate(-1);}}>NO</button>
        </form>
    );
};