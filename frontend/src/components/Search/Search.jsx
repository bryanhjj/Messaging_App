import { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

// mui stuff here
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]); 
    const token = localStorage.getItem("token");

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
        <div className="search-com-container">
            <div className="input-wrapper">
                <SearchIcon className="search-icon"/>
                <input 
                    className="search-input"
                    placeholder="Search for other users by username"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <div className="search-result-list">
                {searchResults.map((item) => {
                    return (
                        <Link key={item.id} to={`/profile/${item.id}`} className="results">
                            {item.username}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
};