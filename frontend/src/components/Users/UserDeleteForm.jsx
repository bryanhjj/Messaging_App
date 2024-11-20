import { Form, useNavigate } from "react";

// get mui stuff in here

export function UserDeleteForm () {
    const navigate = useNavigate();

    return (
        <Form>
            <h2>Are you certain that you want to delete your account?</h2>
            <button type="submit">YES</button>
            <button type="button" onClick={() => {navigate(-1);}}>NO</button>
        </Form>
    );
};