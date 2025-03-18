import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatInput } from "./ChatInput";
import { UserContext } from "../Users/UserContext";
import "./Chatroom.css";

// get some mui stuff
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Chatroom () {
    const { chatroomId } = useParams();
    const [chatlog, setChatlog] = useState([]);
    const [user] = useContext(UserContext);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

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

    const otherUser = chatlog.find((u) => {
        if (u.id != user.id) {
            return u;
        }
    })

    return (
        <div className="cr-container">
            {otherUser ? 
                <div className="header">
                    <button className="chevron-button" onClick={() => {navigate(-1);}}>
                        <ChevronLeftIcon />
                    </button>
                    <h3 className="chat-title">Chatting with: {otherUser.author.username}</h3>
                </div>
            : 
                <p>Loading...</p>
            }
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