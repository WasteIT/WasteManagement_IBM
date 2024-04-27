import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getWasteFractionColor } from '../../utils/GetColour';

const WasteFractionInfoBox = ({wasteFraction, bins, pickup, avgerageWithOneDecimal}) => {
  const [activeButton, setActiveButton] = useState("all"); //initially select "All bins"
  const [avgFillLevelForCurrentSelection, setAvgFillLevelForCurrentSelection] = useState(0);
  const [pickupDaysForCurrentSelection, setPickupDaysForCurrentSelection] = useState(0);
  const [overfilledShareForCurrentSelection, setOverfilledShareForCurrentSelection] = useState(0);

  useEffect(() => {
    // use this emtpy dependency arrao ([]) hook to set the correct values when the page first loads. Otherwise they are just 0
    setAvgFillLevelForCurrentSelection(avgerageWithOneDecimal);
    setPickupDaysForCurrentSelection(pickup);
    setOverfilledShareForCurrentSelection(10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (binNumber) => {
    setActiveButton(binNumber);
    if (binNumber === "all") {
      setAvgFillLevelForCurrentSelection(avgerageWithOneDecimal);
      setPickupDaysForCurrentSelection(pickup);
      setOverfilledShareForCurrentSelection( 10 ); //Crap
    } else {
      setAvgFillLevelForCurrentSelection( 99 );
      setPickupDaysForCurrentSelection( 99 );
      setOverfilledShareForCurrentSelection( 99 );
    }
  };


  return (
    <div style={{display: 'flex', justifyContent: 'center', maxWidth: '60rem', width: '60rem', borderRadius: '25px', boxShadow: '-10px 30px 50px rgba(33, 82, 75, 0.5)'}}>
      <div style={{ background: getWasteFractionColor(wasteFraction), borderRadius: '25px 0px 0px 25px', width: '20rem', display: 'flex', alignItems: 'center'  }}>
        <img src={`./images/${wasteFraction}.png`} alt={wasteFraction} style={{
          width: '9rem',
          margin: '0.5rem auto',
          display: 'block'
        }}/>
      </div>
      <div style={{background: 'white', borderRadius: '0px 25px 25px 0px', width: '60rem'}}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', width: '40rem', maxWidth: '40rem' }}>
          <Button 
            style={{ 
              margin: '1.5rem 0.5rem 1rem 1.5rem', 
              backgroundColor: activeButton === "all" ? '#83C6C0' : '#f5f5f5',
              color: '#141414', 
              borderRadius: '25px', 
              border: 'none' }}
          onClick={() => handleClick("all")}>
            All bins
          </Button>
         {
        
         bins.map((bin, index) => (
            <Button 
              key={index} 
              style={{ 
                margin: '1.5rem 0.5rem 1rem 0.5rem', 
                backgroundColor: activeButton === index + 1 ? '#83C6C0' : '#f5f5f5',
                color: '#141414', 
                borderRadius: '25px', 
                border: 'none' 
              }}
              onClick={() => handleClick(index + 1)}>
              Bin #{index + 1} {/* Displaying bin numbers */}
            </Button>
          ))}
    
       </div>
       <div style={{margin: '1rem 1rem 1rem 2rem'}}>
          <div style={{display: 'flex'}}>
            <div style={{width: '30%', margin: '0.4rem 2rem 0.4rem 0.4rem'}}>
                Avg fill level on pick up:
            </div>
            <div style={{margin: '0.3rem', fontSize: '18px', fontWeight: 'bold'}}>
              {avgFillLevelForCurrentSelection} %
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{width: '30%', margin: '0.4rem 2rem 0.4rem 0.4rem'}}>
                Pick up days:
            </div>
            <div style={{margin: '0.3rem', fontSize: '18px', fontWeight: 'bold'}}>
              {pickupDaysForCurrentSelection}
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{width: '30%', margin: '0.4rem 2rem 0.4rem 0.4rem'}}>
                Share of time all waste bins of this type were overfilled: 
            </div>
            <div style={{margin: '0.3rem', fontSize: '18px', fontWeight: 'bold'}}>
              {overfilledShareForCurrentSelection} %
            </div>
          </div>
       </div>
      </div>
    </div>
  );
};

export default WasteFractionInfoBox;

