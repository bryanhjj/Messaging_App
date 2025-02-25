import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Users/UserContext";

// insert mui stuff here

export default function Profile () {
    let { profileId } = useParams();
    const [user] = useContext(UserContext);
    const [targetUser, setTargetUser] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getTargetUserInfo = async () => {
            await fetch(`${process.env.REACT_APP_API_URL}/profile/${profileId}`, 
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => res.json())
            .then((data) => setTargetUser(data));
        };
        getTargetUserInfo();
    }, []);

    const handleStartChat = async (targetUser) => {
        try {
            const newRoom = await fetch(`${API_URL}/chatroom/dashboard`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const newRoomWithUsers = await fetch(`${API_URL}/chatroom/join/${newRoom.id}`, {
                method: "PUT",
                body: {
                    newUserId: Number(targetUser.id),
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div>
            { targetUser ? 
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
                        <div>
                            <button onClick={handleStartChat(targetUser)}>Send message</button>
                        </div>
                    }
                </div>
            : 
                <div>
                    <h1>There's nothing here...</h1>
                </div>
            }
        </div>
    );
};