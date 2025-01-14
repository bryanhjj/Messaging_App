import { useRef, useContext } from "react";
import UserContext from "./UserContext";

// get mui stuff in here

export default function UserUpdateForm () {
    const [user] = useContext(UserContext);
    const updateForm = useRef(null);

    const handleOnSubmit = async () => {
        try {
            const formData = new FormData(updateForm.current);
            const result = await fetch(`${API_URL}/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!result.ok) {
                throw new Error('Update failed');
            };
        } catch(err) {
            console.log(err);
        };
    };

    return (
        <form id="edit-form" ref={updateForm} onSubmit={handleOnSubmit}>
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
            <button type="submit">Confirm changes</button>
        </form>
    );
};