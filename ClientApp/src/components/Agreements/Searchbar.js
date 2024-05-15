import React, { useState, useEffect } from "react";

/**
 * SearchBar is a functional component in React that provides a search input field and a button.
 * It takes a callback function onSearchResult as a prop to handle search queries.
 * 
 * @param {object} props - Props passed to the SearchBar component.
 * @param {function} props.onSearchResult - A callback function to handle search results. It receives the search query as an argument.
 * 
 * @returns {JSX.Element} JSX element representing the SearchBar component.
 */


function SearchBar({ onSearchResult }) {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(()=> {
        onSearchResult(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery])

    const handleSearch = () => {
        onSearchResult(searchQuery);
    };

    return (
        <div className="input-group">
            <input
                type="search"
                className="form-control search_bar"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
                type="button"
                className="btn search_bar_button"
                data-mdb-ripple-init
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
