import React from "react";
import ServiceAgreementsDropdown from "./ServiceAgreementsDropdown";


function SearchResults({ filteredAgreements }) {
    return (
        <ul>
            {filteredAgreements.map((item, index) => (
                <ServiceAgreementsDropdown key={index} name={item} />
            ))}
        </ul>
    );
}

export default SearchResults;
