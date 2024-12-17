import { useState, Form, useNavigate } from "react";

// mui stuff here

export function Search () {
  const [searchQuery, setSearchQuery] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();

    const handleUserSearch = async (username) => {
        try {
          setSearching(!searching);
          const result = await fetch(`${API_URL}/users/search`, {
              headers: "GET",
              body: {
                username: username,
              }
          });
          setSearchResult(...result);
          setSearching(!searching);
      } catch(err) {
        console.log(err); // to implement
      };
    };

    return (
        <div>
            <Form id="search-form" role="search" onSubmit={handleUserSearch(searchQuery)}> 
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                defaultValue="Enter username here"
                onChange={(e) => {setSearchQuery(e.target.value)}}
              />
              <button type="submit">Search</button>
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            {searchResult ? (
              <div>
                {searchResult.map((result) => {
                  <div onClick={() => {navigate(`${URL}/users/${result.id}`)}}>
                    {item.username}
                  </div>
                })}
              </div>
            ) : (
              <div>
                <h2>We couldn't find anything that matches your queries.</h2>
              </div>
            )}
        </div>
    )
};