import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getWasteFractionColor } from '../../utils/GetColour';
import { sortWeekdays } from '../../utils/SortDays'

/**
 * WasteFractionInfoBox is a functional component in React responsible for rendering information about a specific waste fraction.
 * 
 * @param {object} props - Props passed to the WasteFractionInfoBox component.
 * @param {string} props.wasteFraction - The type of waste fraction being displayed.
 * @param {array} props.bins - An array containing information about individual waste bins.
 * @param {array} props.pickup - An array containing pickup days for the waste fraction.
 * @param {number} props.avgerageWithOneDecimal - The average fill level for the waste fraction, rounded to one decimal point.
 * 
 * @returns {JSX.Element} JSX element representing the WasteFractionInfoBox component.
 */


const WasteFractionInfoBox = ({wasteFraction, bins, pickup, avgerageWithOneDecimal}) => {
  const [activeButton, setActiveButton] = useState("all");
  const [avgFillLevelForCurrentSelection, setAvgFillLevelForCurrentSelection] = useState(0);
  const [pickupDaysForCurrentSelection, setPickupDaysForCurrentSelection] = useState(0);
  const [overfilledShareForCurrentSelection, setOverfilledShareForCurrentSelection] = useState(0);
  useEffect(() => {
    setAvgFillLevelForCurrentSelection(avgerageWithOneDecimal);
    setPickupDaysForCurrentSelection(sortWeekdays(pickup));
    setOverfilledShareForCurrentSelection(10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = (binNumber) => {
    setActiveButton(binNumber);
    if (binNumber === "all") {
      setAvgFillLevelForCurrentSelection(avgerageWithOneDecimal);
      setPickupDaysForCurrentSelection(pickup);
      setOverfilledShareForCurrentSelection( 10 );
    } else {
      setAvgFillLevelForCurrentSelection( 99 );
      setPickupDaysForCurrentSelection( 99 );
      setOverfilledShareForCurrentSelection( 99 );
    }
  };


  return (
    <div className='waste-fraction-info-box-page-wrapper'>
      <div className="waste-fraction-info-box-image-wrapper" style={{ background: getWasteFractionColor(wasteFraction)}}>
        <img className="waste-fraction-info-box-image" src={`./images/${wasteFraction}.png`} alt={wasteFraction}/>
      </div>
      <div className="waste-fraction-info-box-information-wrapper ">
        <div className='waste-fraction-info-box-button-wrapper'>
          <Button 
            className='waste-fraction-info-box-button'
            style={{backgroundColor: activeButton === "all" ? '#83C6C0' : '#f5f5f5'}}
            onClick={() => handleClick("all")}>
            All bins
          </Button>
          { bins.map((bin, index) => (
            <Button 
              key={index} 
              className='waste-fraction-info-box-button'
              style={{ backgroundColor: activeButton === index + 1 ? '#83C6C0' : '#f5f5f5'}}
              onClick={() => handleClick(index + 1)}>
              Bin #{index + 1}
            </Button>
          ))}
    
       </div>
       <div className='waste-fraction-info-box-text-section-wrapper '>
          <div className='flex'>
            <div className='waste-fraction-info-box-text-section-title'>
                Avg fill level on pick up:
            </div>
            <div className='waste-fraction-info-box-text-section-text'>
              {avgFillLevelForCurrentSelection} %
            </div>
          </div>
          <div className='flex'>
            <div className='waste-fraction-info-box-text-section-title'>
                Pick up days:
            </div>
            <div className='waste-fraction-info-box-text-section-text'>
              {pickupDaysForCurrentSelection.length > 0 ? pickupDaysForCurrentSelection.join(", ") : "By appointment"}
            </div>
          </div>
          <div className='flex'>
            <div className='waste-fraction-info-box-text-section-title'>
                Share of time all waste bins of this type were overfilled: 
            </div>
            <div className='waste-fraction-info-box-text-section-text'>
              {overfilledShareForCurrentSelection} %
            </div>
          </div>
       </div>
      </div>
    </div>
  );
};

export default WasteFractionInfoBox;

