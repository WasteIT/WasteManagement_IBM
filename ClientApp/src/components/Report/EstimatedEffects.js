import React from 'react';
import CountUp from 'react-countup';

export default function EstimatedEffects() {    

    const yearlySavings = getRandomNumber(14960, 2000);
    const emissionReduction = getRandomNumber(12, 4);
    const savingsPerHousehold = getRandomNumber(450, 75);
    const recyclingRateIncrease = getRandomNumber(25, 10);

    return (
        <div style={{width: '40rem', background: '#F5F5F5', borderRadius: '25px', boxShadow: '-10px 30px 50px rgba(33, 82, 75, 0.5)', marginTop: '2.5rem'}}>
            <div style={{display: 'flex', padding: '1rem 1rem 1rem 1rem'}}>
                <img style={{width: '5rem'}} src='./images/stonks.png' alt="Card cap"/>
                <div style={{alignContent: 'center', paddingLeft: '1rem'}}>
                    <h3> Estimated Effects</h3>
                </div>
            </div>
            <div style = {{ display: 'flex'}}>
                <div style = {{padding: '1rem'}}>
                    <div style = {{background: 'white', boxShadow: '-10px 10px 25px rgba(33, 82, 75, 0.5)', borderRadius: '25px', padding: '1rem', width:'18rem', height:'18rem', alignContent:'center'}}>
                        <div style = {{textAlign: 'center'}}>
                            <img style={{width: '5rem', margin: '0.5rem'}} src='./images/Money.png' alt="Card cap"/>
                            <h3 style={{color: '#579249', fontWeight: 'bold'}}>
                                <CountUp end={yearlySavings} duration={5} prefix="DKK " />
                            </h3>
                            <h6>
                                Saved yearly
                            </h6>
                        </div>
                        <p>
                            Expenses before and after recommended actions
                        </p>
                    </div>
                </div>
                <div style = {{padding: '1rem'}}>
                    <div style = {{background: 'white', boxShadow: '-10px 10px 25px rgba(33, 82, 75, 0.5)', borderRadius: '25px', padding: '1rem', width:'18rem', height:'18rem', alignContent:'center'}}>
                        <div style = {{textAlign: 'center'}}>
                            <img style={{width: '5rem'}} src='./images/fire.png' alt="Card cap"/>
                            <h3 style={{color: '#579249', fontWeight: 'bold'}}>
                                <CountUp end={emissionReduction} duration={2} suffix=" %" />
                            </h3>
                            <h6>
                                Estimated emission reduction
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
            <div style = {{padding: '1rem', display: 'flex'}}>
                <div style = {{background: 'white', boxShadow: '-2px 2px 18px rgba(33, 82, 75, 0.5)', borderRadius: '25px', marginRight: '1rem', padding: '1rem', width:'12rem', height:'12rem', alignContent:'center'}}>
                    <div style = {{textAlign: 'center'}}>
                        <img style={{height: '4rem'}} src='./images/houseStonks.png' alt="Card cap"/>
                        <h5 style={{color: '#579249', fontWeight: 'bold'}}>
                            <CountUp end={savingsPerHousehold} duration={4} prefix="DKK " />
                        </h5>
                        <p>
                            Saved per household
                        </p>
                    </div>
                </div>
                <div style = {{background: 'white', boxShadow: '-2px 2px 18px rgba(33, 82, 75, 0.5)', borderRadius: '25px', marginRight: '1rem', marginLeft: '1rem', padding: '1rem', width:'12rem', height:'12rem', alignContent:'center'}}>
                    <div style = {{textAlign: 'center'}}>
                        <img style={{width: '4rem', height: '4rem'}} src='./images/Recycle.png' alt="Card cap"/>
                        <h5 style={{color: '#579249', fontWeight: 'bold'}}>
                            <CountUp end={recyclingRateIncrease} duration={2} suffix=" %" />
                        </h5>
                        <p>
                            Rate of recycling
                        </p>
                    </div>
                </div>
                <div style = {{background: 'white',boxShadow: '-2px 2px 18px rgba(33, 82, 75, 0.5)',borderRadius: '25px',marginLeft: '1rem', padding: '1rem',width:'12rem',height:'12rem',alignContent:'center'}}>
                        <div style = {{textAlign: 'center'}}>
                            <img style={{width: '4rem', height: '4rem'}} src='./images/Truck.png' alt="Card cap"/>
                            <h5 style={{color: '#579249', fontWeight: 'bold'}}>
                                <CountUp end={savingsPerHousehold} duration={4} prefix="DKK " />   
                            </h5>
                            <p>
                                Saved per household
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    );
}

function getRandomNumber(base, variance) {
    return Math.round(base + (Math.random() * variance - (variance / 2)));
}