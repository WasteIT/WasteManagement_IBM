import React, { useEffect, useState } from 'react';
import './report.css';

const WastePickupSchedule = ({ address }) => {
  const [wasteTypes, setWasteTypes] = useState([]);

  useEffect(() => {
    const fetchWasteTypes = async () => {
      try {
        const response = await fetch(`https://wasteit-backend.azurewebsites.net/pickup-schedule/${address}`);
        const data = await response.json();

        // Transform the data into the desired format
        const transformedData = Object.entries(data).map(([name, days]) => ({ name, day: days }));
        setWasteTypes(transformedData);
      } catch (error) {
        console.error('Error fetching waste pickup schedule:', error);
      }
    };

    fetchWasteTypes();
  }, [address]);

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