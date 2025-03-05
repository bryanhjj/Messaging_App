import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Users/UserContext";

// insert mui stuff here

export default function Profile () {
    let { profileId } = useParams();
    const [user] = useContext(UserContext);
    const [targetUser, setTargetUser] = useState();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

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

    const handleStartChat = async () => {
        const result = await fetch(`${process.env.REACT_APP_API_URL}/chatroom/dashboard`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                return fetch(`${process.env.REACT_APP_API_URL}/chatroom/join/${data.id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        newUserId: Number(targetUser.id),
                    }),
                })
            })
            .then((res) => res.json())
            .catch((err) => console.log(err));
        if (!result.ok) {
            throw new Error("An error has occured.");
        } else {
            alert("Chatroom created.");
            navigate("/");
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
                            <button onClick={handleStartChat}>Send message</button>
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