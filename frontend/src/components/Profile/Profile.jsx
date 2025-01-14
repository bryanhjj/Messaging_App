import { useRef, useContext, useEffect, useState, useParams } from "react";
import UserContext from "../Users/UserContext";

// insert mui stuff here

// maybe friend system here too

export default function Profile () {
    let {profileUserID} = useParams();
    const [user] = useContext(UserContext);
    const [targetUser, setTargetUser] = useState(null);

    useEffect(() => {
        getTargetUserInfo(profileUserID);
    }, []);

    const getTargetUserInfo = async (profileUserID) => {
        try {
            const result = await fetch(`${API_URL}/users/searchId`, {
              headers: "GET",
              body: {
                id: profileUserID,
              }
            });
            setTargetUser(result);
        } catch(err) {
            console.log(err);
        };
    };

    const handleStartChat = async (targetUser) => {
        try {
            const newRoom = await fetch(`${API_URL}/chatroom/dashboard`, {
                headers: "POST",
            });
            const newRoomWithUsers = await fetch(`${API_URL}/chatroom/join/${newRoom.id}`, {
                headers: "PUT",
                body: {
                    newUser: targetUser,
                }
            });
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div>
                <h1>{targetUser.username}</h1>
            </div>
            <div>
                <h2>Bio: </h2>
                <p>{targetUser.bio}</p>
            </div>
            { user.id === targetUser.id ? 
                <></>
            : 
                <form onSubmit={handleStartChat(targetUser)}>
                    <button type="submit">Send Message</button>
                </form>
            }
        </div>
    );
};