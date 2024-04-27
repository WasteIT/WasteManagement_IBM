import React, { useState } from "react";
import FetchAgreementData from "../components/Agreements/FetchAgreementData";
import SearchResults from "../components/Agreements/SearchResults";
import SearchBar from "../components/Agreements/Searchbar";
import '@fontsource/roboto';
import './/Agreements.css';

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
      <div className="agreement_title">
        <img className="agreementIcon" alt = "agreement icon" src={`./images/agreementIcon.png`}/>
        <h2>Agreements</h2>
        <SearchBar onSearchResult={handleSearchQueryChange} />
      </div>
       <div>
            
            <SearchResults filteredAgreements={filteredAgreements} />
        </div>
     </main>
   );
}