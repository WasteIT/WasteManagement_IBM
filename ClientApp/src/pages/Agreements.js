import React, { useState } from "react";
import FetchAgreementData from "../components/FetchAgreementData";
import SearchResults from "../components/SearchResults";
import SearchBar from "../components/Searchbar";

export default function Agreements(){
  const { serviceAgreements, isLoading } = FetchAgreementData();
  const [searchQuery, setSearchQuery] = useState("");
  
  if (isLoading) {
    return null;
  }

  const filteredAgreements = serviceAgreements.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  
   return (
     <main className='main'>
       <div>
            <SearchBar onSearchResult={handleSearchQueryChange} />
            <SearchResults filteredAgreements={filteredAgreements} />
        </div>
     </main>
   );
}