import React, {Component, useState } from "react";
import Cards from "../components/Card";
import Actions from "../components/Report/Actions";
import EstimatedEffects from "../components/Report/EstimatedEffects";
class Report extends Component {
    render() {
     return (
       <main className='main'>
            <div style={{textAlign: 'center'}}>
                <h1>
                    findings
                </h1>    
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Actions/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <EstimatedEffects/>
                
            </div>
       </main>
     );
    }
 }
 
 export default Report;