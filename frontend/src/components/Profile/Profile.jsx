import { useRef, useContext } from "react";
import UserContext from "./UserContext";

// insert mui stuff here

export function Profile () {
    const [user] = useContext(UserContext);

    return (
        <div>
            <h1>Bio: </h1>
            <p>{user.bio}</p>
        </div>
    );
};