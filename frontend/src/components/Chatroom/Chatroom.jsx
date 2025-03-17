import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ChatInput } from "./ChatInput";
import { UserContext } from "../Users/UserContext";
import "./Chatroom.css";

// get some mui stuff

export default function Chatroom () {
    const { chatroomId } = useParams();
    const [chatlog, setChatlog] = useState([]);
    const [user] = useContext(UserContext);
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
        <div className="cr-container">
            <div className="chatroom">
                {chatlog.map(c => {
                    return( 
                        <div key={c.id} className={`${user.id === c.authorId ? "right-bubble" : "left-bubble"}`}>
                            <p className="cr-content">{c.content}</p>
                            <p className="msg-date">{new Date(c.createdAt).toLocaleDateString()} {new Date(c.createdAt).toLocaleTimeString()}</p>
                        </div>
                    )  
                })}
            </div>
            <ChatInput setChatlog={setChatlog}/>
        </div>
    );
};