import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const ServiceWasteTypeDropdown = ({ wasteType, sensors, onChange }) => {
  const handleSensorClick = (sensor) => {
    onChange(sensor);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {wasteType}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {sensors.map((sensor, index) => (
          <Dropdown.Item key={index} onClick={() => handleSensorClick(sensor)}>
            {sensor.name} sensor: {index + 1}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ServiceWasteTypeDropdown;
