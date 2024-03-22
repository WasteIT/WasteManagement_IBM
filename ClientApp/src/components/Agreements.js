import { Component } from "react";
import ServiceAgrgeementsDropdown from "./ServiceAgreementsDropdown";

class Agreements extends Component {
    render() {
        return (
           <main className="main">
                <div className="input-group">
                    <input type="search" className="form-control search_bar" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" className="btn search_bar_button" data-mdb-ripple-init>search</button>
                </div>

                <ServiceAgrgeementsDropdown/>
                <ServiceAgrgeementsDropdown/>

           </main>
        );
    }
}

export default Agreements