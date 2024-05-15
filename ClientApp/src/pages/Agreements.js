import React, { useState } from "react";
import FetchAgreementData from "../components/Agreements/FetchAgreementData";
import SearchResults from "../components/Agreements/SearchResults";
import SearchBar from "../components/Agreements/Searchbar";

/**
 * Agreements is a functional component that displays a list of service agreements.
 * It includes a search functionality to filter agreements based on user input.
 * 
 * @returns {JSX.Element} JSX element representing the Agreements component.
 */

export default function Agreements(){
  const { serviceAgreements, isLoading } = FetchAgreementData();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredAgreements = serviceAgreements.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return (
      
      <div>
        <main className='main'>
          <div className="agreement_title">
            <div style={{borderRadius: '7px', background: 'lightgrey', color: 'lightgrey', padding: '2.8% 1.3% 0% 0%', margin: '1.05rem'}}>Test</div>
            <h2>Agreements</h2>
            <SearchBar onSearchResult={handleSearchQueryChange} />
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'block', color: 'white', background: 'lightgray', width: '37rem', padding: '1rem', borderRadius: '30px', marginLeft: '1rem', marginBottom: '3rem', fontWeight: 'bold', textAlign: 'center'}}> . . . </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'block', color: 'white', background: 'lightgray', width: '37rem', padding: '1rem', borderRadius: '30px', marginLeft: '1rem', marginBottom: '3rem', fontWeight: 'bold', textAlign: 'center'}}> . . . </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'block', color: 'white', background: 'lightgray', width: '37rem', padding: '1rem', borderRadius: '30px', marginLeft: '1rem', marginBottom: '3rem', fontWeight: 'bold', textAlign: 'center'}}> . . . </div>
          </div>
        </main>
      </div>
    )
  }

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