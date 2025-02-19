import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatInput } from "./ChatInput";

// get some mui stuff

export default function Chatroom () {
    const { chatroomId } = useParams();
    const [chatlog, setChatlog] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchChatlog = async () => {
            await fetch(`${process.env.REACT_APP_API_URL}/message/${chatroomId}`, 
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => res.json())
            .then((data) => setChatlog(data));
        };
        fetchChatlog();
    }, []);

    return (
        <div>
            <div id="chat-container">
                {chatlog.map(c => {
                    return( 
                        <div key={c.id}>
                            <p>{c.content}</p>
                            <p>{c.createdAt}</p>
                        </div>
                    )  
                })}
            </div>
            <ChatInput setChatlog={setChatlog}/>
        </div>
    );
};