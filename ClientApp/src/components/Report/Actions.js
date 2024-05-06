import React from 'react';
import Action from './Action';

export default function Actions({ data }) {
    return (
        <div style={{width: '40rem', background: '#F5F5F5', borderRadius: '25px', boxShadow: '-10px 30px 50px rgba(33, 82, 75, 0.4)'}}>
            <div style={{display: 'flex', padding: '1rem 1rem 1rem 1rem'}}>
                <img style={{width: '5rem'}} src='./images/Desk_fill.png' alt="Card cap"/>
                <div style={{alignContent: 'center', paddingLeft: '1rem'}}>
                    <h3>Recommended Actions</h3>
                </div>
            </div>
            <div style={{padding: '1rem'}}>
                {data && Object.entries(data).map(([operation, fractions]) => {
                    return Object.entries(fractions).map(([fraction, {amount, description}]) => {
                        
                        
                        return (
                            <Action
                                key={`${operation}-${fraction}`}
                                fraction={fraction}
                                action={operation}
                                binId={'1'} 
                                numberOfBins={amount}
                            />
                        );
                    });
                })}
            </div>
        </div>
    );
}
