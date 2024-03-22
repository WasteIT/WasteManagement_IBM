import React, { Component } from 'react';
import Cards from "./Card";

class Home extends Component {
   render() {
    return (
      <main className='main'>
        <div className="card_container">
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
        </div>
      </main>
    );
   }
}

export default Home;