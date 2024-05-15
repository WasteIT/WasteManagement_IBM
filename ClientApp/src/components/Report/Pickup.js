import React, { useEffect, useState } from 'react';
import './report.css';
import { sortWeekdays } from '../../utils/SortDays'

/**
 * WastePickupSchedule is a functional component that displays the recommended new pickup schedule
 * for different waste types based on the provided address.
 * 
 * @param {string} address - The address for which the pickup schedule is fetched.
 * @returns {JSX.Element} - The JSX element representing the recommended pickup schedule.
 */

const WastePickupSchedule = ({ address }) => {
  const [wasteTypes, setWasteTypes] = useState([]);

  useEffect(() => {
    const fetchWasteTypes = async () => {
      try {
        const response = await fetch(`https://wasteit-backend.azurewebsites.net/pickup-schedule/${address}`);
        const data = await response.json();

        
        const transformedData = Object.entries(data).map(([name, days]) => ({
          name,
          day: days.includes('Every') ? days : wrapperSort(days)
        }));
        setWasteTypes(transformedData);
      } catch (error) {
        console.error('Error fetching waste pickup schedule:', error);
      }
    };

    fetchWasteTypes();
  }, [address]);

  const wrapperSort = (days) => {
    let daysArray = days.split(', ');
    sortWeekdays(daysArray)
    let temp = daysArray.join(', ');
    console.log(temp)
    return temp
  } 

  return (
    <div className="waste-schedule">
      <div className="schedule-header">
        <img className="schedule-icon" alt="agreement icon" src={`./images/scheduleIcon.png`} />
        <h2 className='schedule-title'>Recommended New Pickup Schedule</h2>
      </div>
      <ul>
        {wasteTypes.map((waste, index) => (
          <li className="pickup-items" key={index}>
            <div className="schedule-fraction-item">{waste.name}: </div>
            {waste.day}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WastePickupSchedule;
