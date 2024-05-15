import React from "react";
import ServiceAgreementsDropdown from "./ServiceAgreementsDropdown";

/**
 * SearchResults is a functional component in React that displays a list of service agreements based on the filteredAgreements prop.
 * 
 * @param {object} props - Props passed to the SearchResults component.
 * @param {array} props.filteredAgreements - An array containing filtered service agreements to be displayed.
 * 
 * @returns {JSX.Element} JSX element representing the SearchResults component.
 */

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
