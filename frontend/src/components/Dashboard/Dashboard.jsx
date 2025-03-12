import { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { SearchBar } from '../Search/Search';
import { UserContext } from "../Users/UserContext";
import './Dashboard.css';

// mui stuff

export default function Dashboard () {
    const [chatroom, setChatroom] = useState([]);
    const [user] = useContext(UserContext);
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
        <div className="dashboard-container">

            <SearchBar />
            
            {chatroom.length >= 1 ? (
                <div className="chatroom-results">
                    <h3>Active chatrooms: </h3>
                    <div className="chatroom-container">
                        {chatroom.map((c) => {
                            return (    
                                <Link to={`chatroom/${c.id}`} className="chatroom-card" key={c.id}>
                                    {c.users.map((u) => {
                                        {/* to show the other chatroom participant that's not the logged in user themselves */}
                                        if (u.id != user.id) {
                                            return u.username;
                                        }
                                    })}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : 
            <div className="chatroom-results">You are not in any chatrooms.</div>
            }

        </div>
    );
};