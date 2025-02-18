import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Dashboard.css';
import Chatroom from '../Chatroom/Chatroom';

// mui stuff

export default function Dashboard () {
    const [chatroom, setChatroom] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchChatroom = async () => {
            await fetch(`${process.env.REACT_APP_API_URL}/chatroom/dashboard`, 
                {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((res) => res.json())
            .then((data) => setChatroom(data));
        };
        fetchChatroom();
    }, []);

    return(
        <div>
            {chatroom.length >= 1 ? (
                <div>
                    {chatroom.map((c) => {
                        return (
                            <li key={c.id}>
                                <Link to={`chatroom/${c.id}`}>{c.createdAt}</Link>
                            </li>
                        );
                    })}
                </div>
            ) : 
            <div>You are not in any chatrooms.</div>
            }
        </div>
    );
};