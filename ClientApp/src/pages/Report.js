import React, {Component, useState } from "react";
import Cards from "../components/Card";
import Actions from "../components/Report/Actions";
import EstimatedEffects from "../components/Report/EstimatedEffects";
class Report extends Component {
    render() {
     return (
       <main className='main'>
        <div>
            <h1>
                findings
            </h1>    
        </div>
        <div>
            <Actions/>
        </div>
        <div>
            <EstimatedEffects/>
            
        </div>
        <div>
            <h3>
                Download Report
            </h3>
            <img/>
        </div>
        <div>
            <div>
                <img/>
                <h3>
                    Waste distribution
                </h3>
            </div>
            <h3>
                Before recommended actions
            </h3>
            <img/>
            <h3>
               After recommended actions 
            </h3>
            <img/>
        </div>
        <div>
            <div>
                <img/>
                <h3>
                    Recommended new pickup schedule
                </h3>
            </div>
            <div>
                <p>General Waste:</p>
                <p>Monday Thursday</p>
            </div>
            <div>
                <p>Cardboard:</p>
                <p>Monday</p>
            </div>
        </div>
       </main>
     );
    }
 }
 
 export default Report;