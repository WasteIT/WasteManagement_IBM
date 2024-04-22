import React, { useState } from "react";

function SearchBar({ onSearchResult }) {
    const [searchQuery, setSearchQuery] = useState("");

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
