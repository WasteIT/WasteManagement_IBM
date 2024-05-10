import React from 'react';
import './report.css';

const WastePickupSchedule = () => {
  const wasteTypes = [
    { name: 'Cardboard', day: 'Monday' },
    { name: 'Paper', day: 'Thursday' },
    { name: 'Plastic', day: 'Tuesday' },
    { name: 'Glass', day: 'Friday' },
    { name: 'Metal', day: 'Wednesday' },
  ];

  return (
    <div className="waste-schedule">
        <div className="schedule-header">
            <img className="schedule-icon" alt = "agreement icon" src={`./images/scheduleIcon.png`}/>
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
