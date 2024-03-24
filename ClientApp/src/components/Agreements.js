import { Component, useEffect } from "react";
import ServiceAgreementsDropdown from "./ServiceAgreementsDropdown";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';
import { json } from "react-router-dom";

class Agreements extends Component {

    state = {
        serviceAgreements: [],
      };
      
    
    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch('http://localhost:5000/agreement');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        this.setState({ serviceAgreements: jsonData });
        console.log(this.state.serviceAgreements);
    };

    render() {
        return (
           <main className="main">
                <div className="input-group">
                    <input type="search" className="form-control search_bar" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" className="btn search_bar_button" data-mdb-ripple-init>search</button>
                </div>
                <div>
                    {this.state.serviceAgreements.map(item => (
                        <ServiceAgreementsDropdown name={item}/>
                    ))}
                </div>
           </main>
        );
    }
}

export default Agreements