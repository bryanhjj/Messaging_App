import { useEffect, useState, Form, useNavigate, useParams } from "react";
import { ChatInput } from "./ChatInput";

// get some mui stuff

export function Chatroom () {
    let chatroomId = useParams();
    const navigate = useNavigate();
    const [chatlog, setChatlog] = useState([]);

    useEffect(() => {
        fetchChatlog();
    }, []);

    const fetchChatlog = async () => {
        try {
            const result = await fetch(`${API_URL}/message/${chatroomId}`, 
                {
                    method: "GET",
                }
            );
            setChatlog(...result);
        } catch(err) {
            console.log(err.message); // update and use a better error handler
        }
    };

    return (
        <div>
            <div id="chat-container">
                {chatlog.map(c => {
                    <div key={c.id}>
                        <p>{c.content}</p>
                        <p>{c.createdAt}</p>
                    </div>
                })}
            </div>
            <ChatInput
                chatroomId={chatroomId}
            />
        </div>
    );
};