import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

export default function EstimatedEffects({ data}) {    


    const [costChange, setCostChange] = useState(0);

    useEffect(() => {
        let change = 0;
        if (data) {
            Object.entries(data).forEach(([operation, fractions]) => {
                Object.entries(fractions).forEach(([fraction, {amount, schedules, sensorData}]) => {
                    console.log(fraction)
                    if ( fraction === 'general waste') {
                        if (operation === 'add') {
                            change -= amount * 400 * 7.5 * 2 //Fix to accurately reflect pick up schedule for general waste containers.
                        } else if (operation === 'remove') {
                            change += amount * 400 * 7.5 * 2 //Fix to accurately reflect pick up schedule for general waste containers.
                        }
                    }
                });
            });
        }
        setCostChange(change);
    }, [data]);

    //Hardcoded for now. Yearly cost for 24 households...
    let numberOfHouseholds = 24;
    let numberOfGeneralWasteContainersTemp = 3
    let generalWasteContainersScheduleTemp = 2
    let totalCostBefore = 2629 * numberOfHouseholds + numberOfGeneralWasteContainersTemp * 400 * generalWasteContainersScheduleTemp * 7.5;

    
    //const yearlySavings = getRandomNumber(14960, 2000);
    //const emissionReduction = getRandomNumber(12, 4);
    //const savingsPerHousehold = getRandomNumber(450, 75);
    //const recyclingRateIncrease = getRandomNumber(25, 10);

    const yearlySavingsBefore = totalCostBefore;
    const emissionReductionBefore = "TBD";
    const savingsPerHouseholdBefore = yearlySavingsBefore / 24;
    const recyclingRateIncreaseBefore = "TBD";
    const averageWeeklyPickupBefore = "TBD";

    const yearlySavings = costChange;
    const emissionReduction = "TBD";
    const savingsPerHousehold = costChange / numberOfHouseholds;
    const recyclingRateIncrease = "TBD";

    return (
        <div style={{width: '40rem', background: '#F5F5F5', borderRadius: '25px', boxShadow: '-5px 5px 50px rgba(33, 82, 75, 0.4)', marginTop: '2.5rem'}}>
            <div style={{display: 'flex', padding: '1rem 1rem 1rem 1rem'}}>
                <img style={{width: '5rem'}} src='./images/stonks.png' alt="Card cap"/>
                <div style={{alignContent: 'center', paddingLeft: '1rem'}}>
                    <h3> Estimated Effects</h3>
                </div>
            </div>
            <div style = {{ display: 'flex'}}>
                <div data-testid="Money" style = {{padding: '1rem'}}>
                    <div style = {{background: 'white', borderRadius: '25px', padding: '1rem', width:'18rem', height:'18rem', alignContent:'center'}}>
                        <div style = {{textAlign: 'center'}}>
                            <img style={{width: '5rem', margin: '0.5rem'}} src='./images/Money.png' alt="Card cap"/>
                            <h3 id="yearlySavings" style={{color: '#579249', fontWeight: 'bold'}}>
                                <CountUp end={yearlySavings} duration={5} prefix="DKK " />
                            </h3>
                            <h6>
                                Saved yearly
                            </h6>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-around', position: 'relative', top: '40px'}}>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'left'}}>
                                <p>Before: DKK {yearlySavingsBefore}</p>
                            </div>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'right'}}>
                                <p>After: DKK {yearlySavingsBefore - yearlySavings}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-testid="CO2"style = {{padding: '1rem'}}>
                    <div style = {{background: 'white', borderRadius: '25px', padding: '1rem', width:'18rem', height:'18rem', alignContent:'center'}}>
                        <div style = {{textAlign: 'center'}}>
                            <img style={{width: '5rem'}} src='./images/fire.png' alt="Card cap"/>
                            <h3 id="emissionReduction" style={{color: '#579249', fontWeight: 'bold'}}>
                                <CountUp end={emissionReduction} duration={2} suffix=" %" />
                            </h3>
                            <h6>
                                Estimated emission reduction
                            </h6>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-around', position: 'relative', top: '40px', height: "50px"}}>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'left'}}>
                                <p>Before: {emissionReductionBefore} %</p>
                            </div>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'right'}}>
                                <p>After: {emissionReductionBefore + emissionReduction} %</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style = {{padding: '1rem', display: 'flex'}}>
                <div data-testid="Household" style = {{background: 'white', borderRadius: '25px', marginRight: '1rem', padding: '1rem', width:'12rem', height:'18rem', alignContent:'center'}}>
                    <div style = {{textAlign: 'center'}}>
                        <img style={{height: '5rem'}} src='./images/houseStonks.png' alt="Card cap"/>
                        <h5 id="savingsPerHousehold" style={{color: '#579249', fontWeight: 'bold'}}>
                            <CountUp end={savingsPerHousehold} duration={4} prefix="DKK " />
                        </h5>
                        <p>
                            Saved per household
                        </p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-around', position: 'relative', top: '40px'}}>
                        <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'left'}}>
                            <p>Before: DKK {savingsPerHouseholdBefore}</p>
                        </div>
                        <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'right'}}>
                            <p>After: DKK {savingsPerHouseholdBefore - savingsPerHousehold}</p>
                        </div>
                    </div>
                </div>
                <div data-testid="Recycle" style = {{background: 'white', borderRadius: '25px', marginRight: '1rem', marginLeft: '1rem', padding: '1rem', width:'12rem', height:'18rem', alignContent:'center'}}>
                    <div style = {{textAlign: 'center'}}>
                        <img style={{height: '5rem'}} src='./images/Recycle.png' alt="Card cap"/>
                        <h5 id="recyclingRateIncrease"  style={{color: '#579249', fontWeight: 'bold'}}>
                            <CountUp end={recyclingRateIncrease} duration={2} suffix=" %" />
                        </h5>
                        <p>
                            Rate of recycling
                        </p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-around', position: 'relative', top: '40px', height: '30px'}}>
                        <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'left'}}>
                            <p>Before: {recyclingRateIncreaseBefore} %</p>
                        </div>
                        <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'right'}}>
                            <p>After: {recyclingRateIncreaseBefore - recyclingRateIncrease} %</p>
                        </div>
                    </div>
                </div>
                <div data-testid="Truck" style = {{background: 'white', borderRadius: '25px',marginLeft: '1rem', padding: '1rem',width:'12rem',height:'18rem',alignContent:'center'}}>
                        <div style = {{textAlign: 'center'}}>
                            <img style={{height: '5rem'}} src='./images/Truck.png' alt="Card cap"/>
                            <h5 id="averagePickup" style={{color: '#579249', fontWeight: 'bold'}}>
                                <CountUp end={"TBD"} duration={4} suffix=" times" />   
                            </h5>
                            <p>
                                Average weekly pickups
                            </p>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-around', position: 'relative', top: '40px'}}>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'left'}}>
                                <p>Before: {averageWeeklyPickupBefore} times</p>
                            </div>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'right'}}>
                                <p>After: {averageWeeklyPickupBefore} times</p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

//function getRandomNumber(base, variance) {
//    return Math.round(base + (Math.random() * variance - (variance / 2)));
//}
