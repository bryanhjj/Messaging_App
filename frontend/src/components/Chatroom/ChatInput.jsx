import { useState, useContext } from "react";
import { UserContext } from "../Users/UserContext";
import { useParams, useNavigate } from "react-router-dom";

// maybe some mui stuff

export function ChatInput ({setChatlog}) {
    const { chatroomId } = useParams();
    const [newMessage, setNewMessage] = useState('');
    const [user] = useContext(UserContext);
    const token = localStorage.getItem("token");

    async function handleSendMessage(event) {
        event.preventDefault();
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/message/${chatroomId}`,
                {
                    method: "POST",
                    body: JSON.stringify({content: newMessage}),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json())
            .then((data) => setChatlog((prevChatlog) => [...prevChatlog, data]));
        } catch (err) {
            console.log(err.message); // update and use a better error handler
        }
    }

    return (
        <form method="post" id="chat-input-form" onSubmit={handleSendMessage}>
            <div id="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                        setNewMessage(e.target.value);
                    }}
                />
                <button type="submit">Send</button>
            </div>
        </form>
    );
};