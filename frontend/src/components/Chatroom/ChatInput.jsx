import { useEffect, useState, Form } from "react";

// maybe some mui stuff

export function ChatInput (user, chatroomId) {
    const [newMessage, setNewMessage] = useState([]);

    const handleSendMessage = async () => {
        try {
            const result = await fetch(`${API_URL}/message/:chatroomId`, // update URL
                {
                    method: "POST",
                    body: {
                        content: newMessage,
                        authorId: user.id,
                        chatroomId: chatroomId,
                    },
                }
            );
        } catch (err) {
            console.log(err.message); // update and use a better error handler
        }
    };

    return (
        <Form method="post" id="chat-input-form" onSubmit={handleSendMessage}>
            <div id="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </div>
        </Form>
    );
};