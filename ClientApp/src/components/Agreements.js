import { Component, useEffect } from "react";
import ServiceAgreementsDropdown from "./ServiceAgreementsDropdown";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';

class Agreements extends Component {

    state = {
        serviceAgreements: [],
      };
      
      async componentDidMount() {
        await this.initializeFirebase();
        await this.fetchSensorData();
      }


  async initializeFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyBrUXDmmZzLtLWYNdqwh4jhFbQvR51SP4A",
      authDomain: "wasteit-193de.firebaseapp.com",
      databaseURL: "https://wasteit-193de-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "wasteit-193de",
      storageBucket: "wasteit-193de.appspot.com",
      messagingSenderId: "956930927762",
      appId: "1:956930927762:web:b0d69690f1091005f04a4b",
      measurementId: "G-DJY9G44K2M"
    };
  
    const app = initializeApp(firebaseConfig);
  }

  async fetchSensorData() {
    const db = getDatabase();
    const Ref = ref(db, "/");
    
    const fetchData = () => {
        onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parentKeys = Object.keys(data);
                this.setState({ serviceAgreements: parentKeys });
            }
        });
    }
      fetchData();
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