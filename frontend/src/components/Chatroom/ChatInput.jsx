import { useState, useContext } from "react";
import UserContext from '../Users/UserContext';

// maybe some mui stuff

export function ChatInput (chatroomId) {
    const [newMessage, setNewMessage] = useState([]);
    const [user] = useContext(UserContext);

    async function handleSendMessage() {
        try {
            const result = await fetch(`${API_URL}/message/${chatroomId}`,
                {
                    method: "POST",
                    body: {
                        content: newMessage,
                        authorId: user.id,
                        chatroomId: chatroomId,
                    },
                }
            );
            if (!result.ok) {
                throw new Error('Unable to send message.');
            };
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
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </div>
        </form>
    );
};