import { useState, Form } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// mui stuff here

export const SearchBar = () => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]); 
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleFetchData = async (value) => {
        await fetch(`${process.env.REACT_APP_API_URL}/users/searchName?username=${value}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => setSearchResults(data));
    };

    const handleChange = (value) => {
        setInput(value);
        handleFetchData(value);
    }

    return (
        <div>
            <input 
                placeholder="Search user"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            {searchResults.map((item) => {
                return (
                    <Link key={item.id} to={`profile/${item.id}`}>
                        {item.username}
                    </Link>
                )
            })}
        </div>
    )
};