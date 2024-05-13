import React from 'react';
import CountUp from 'react-countup';

export default function EstimatedEffects() {    

    //const yearlySavings = getRandomNumber(14960, 2000);
    //const emissionReduction = getRandomNumber(12, 4);
    //const savingsPerHousehold = getRandomNumber(450, 75);
    //const recyclingRateIncrease = getRandomNumber(25, 10);

    const yearlySavings = 14960
    const emissionReduction = 12
    const savingsPerHousehold = 450
    const recyclingRateIncrease = 25

    return (
        <div style={{width: '40rem', background: '#F5F5F5', borderRadius: '25px', boxShadow: '-10px 30px 50px rgba(33, 82, 75, 0.4)', marginTop: '2.5rem'}}>
            <div style={{display: 'flex', padding: '1rem 1rem 1rem 1rem'}}>
                <img style={{width: '5rem'}} src='./images/stonks.png' alt="Card cap"/>
                <div style={{alignContent: 'center', paddingLeft: '1rem'}}>
                    <h3> Estimated Effects</h3>
                </div>
            </div>
            <div style = {{ display: 'flex'}}>
                <div style = {{padding: '1rem'}}>
                    <div style = {{background: 'white', boxShadow: '-10px 10px 25px rgba(33, 82, 75, 0.3)', borderRadius: '25px', padding: '1rem', width:'18rem', height:'18rem', alignContent:'center'}}>
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
                                <p>Before: DKK {yearlySavings - 1000}</p>
                            </div>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'right'}}>
                                <p>After: DKK {yearlySavings}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style = {{padding: '1rem'}}>
                    <div style = {{background: 'white', boxShadow: '-10px 10px 25px rgba(33, 82, 75, 0.3)', borderRadius: '25px', padding: '1rem', width:'18rem', height:'18rem', alignContent:'center'}}>
                        <div style = {{textAlign: 'center'}}>
                            <img style={{width: '5rem'}} src='./images/fire.png' alt="Card cap"/>
                            <h3 id="emissionReduction" style={{color: '#579249', fontWeight: 'bold'}}>
                                <CountUp end={emissionReduction} duration={2} suffix=" %" />
                            </h3>
                            <h6>
                                Estimated emission reduction
                            </h6>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-around', position: 'relative', top: '40px'}}>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'left'}}>
                                <p>Before: DKK {yearlySavings - 1000}</p>
                            </div>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'right'}}>
                                <p>After: DKK {yearlySavings}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style = {{padding: '1rem', display: 'flex'}}>
                <div style = {{background: 'white', boxShadow: '-2px 2px 18px rgba(33, 82, 75, 0.3)', borderRadius: '25px', marginRight: '1rem', padding: '1rem', width:'12rem', height:'18rem', alignContent:'center'}}>
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
                            <p>Before: DKK {yearlySavings - 1000}</p>
                        </div>
                        <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'right'}}>
                            <p>After: DKK {yearlySavings}</p>
                        </div>
                    </div>
                </div>
                <div style = {{background: 'white', boxShadow: '-2px 2px 18px rgba(33, 82, 75, 0.3)', borderRadius: '25px', marginRight: '1rem', marginLeft: '1rem', padding: '1rem', width:'12rem', height:'18rem', alignContent:'center'}}>
                    <div style = {{textAlign: 'center'}}>
                        <img style={{height: '5rem'}} src='./images/Recycle.png' alt="Card cap"/>
                        <h5 id="recyclingRateIncrease"  style={{color: '#579249', fontWeight: 'bold'}}>
                            <CountUp end={recyclingRateIncrease} duration={2} suffix=" %" />
                        </h5>
                        <p>
                            Rate of recycling
                        </p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-around', position: 'relative', top: '40px'}}>
                        <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'left'}}>
                            <p>Before: DKK {yearlySavings - 1000}</p>
                        </div>
                        <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'right'}}>
                            <p>After: DKK {yearlySavings}</p>
                        </div>
                    </div>
                </div>
                <div style = {{background: 'white',boxShadow: '-2px 2px 18px rgba(33, 82, 75, 0.3)',borderRadius: '25px',marginLeft: '1rem', padding: '1rem',width:'12rem',height:'18rem',alignContent:'center'}}>
                        <div style = {{textAlign: 'center'}}>
                            <img style={{height: '5rem'}} src='./images/Truck.png' alt="Card cap"/>
                            <h5 id="averagePickup" style={{color: '#579249', fontWeight: 'bold'}}>
                                <CountUp end={5} duration={4} suffix=" times" />   
                            </h5>
                            <p>
                                Average weekly pickups
                            </p>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-around', position: 'relative', top: '40px'}}>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'left'}}>
                                <p>Before: DKK {yearlySavings - 1000}</p>
                            </div>
                            <div style={{fontSize: '0.8rem', opacity: 0.6, textAlign: 'right'}}>
                                <p>After: DKK {yearlySavings}</p>
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
