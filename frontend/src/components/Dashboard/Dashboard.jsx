import { useEffect, useState } from 'react';
import { Chatroom } from '../Chatroom/Chatroom';

// mui stuff

export function Dashboard () {
    const [chatrooms, setChatrooms] = useState([]);

    useEffect(() => {
        fetchUserChatrooms();
    }, []);

    const fetchUserChatrooms = async () => {
        try {
            const result = await fetch(`${API_URL}/chatroom/dashboard`, 
                {
                method: "GET",
                }
            );
            setChatrooms(...result);
        } catch(err) {
            console.log(err);
        }
    };

    return(
        <div>
            {chatrooms.map((c) => {
                return (
                    <Chatroom chatroomId = {c.id} />
                );
            })}
        </div>
    );
};