import React, { useState, useEffect } from "react";
import ServiceAgreementsDropdown from "../components/ServiceAgreementsDropdown";

const fetchDataBeforeAgreements = (WrappedComponent) => {
  return (props) => {
    const [serviceAgreements, setServiceAgreements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://wasteit-backend.azurewebsites.net/agreement"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();
          setServiceAgreements(jsonData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);

    return <WrappedComponent {...props} serviceAgreements={serviceAgreements} isLoading={isLoading} />;
  };
};

const Agreements = ({ serviceAgreements, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  if (isLoading) {
    return null;
  }

  const filteredAgreements = serviceAgreements.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="main">
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
        >
          Search
        </button>
      </div>
      <div>
        {filteredAgreements.map((item, index) => (
          <ServiceAgreementsDropdown key={index} name={item} />
        ))}
      </div>
    </main>
  );
};

export default fetchDataBeforeAgreements(Agreements);
