import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const ServiceWasteTypeDropdown = ({ wasteType, onSelect }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {wasteType}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Sensors to be added</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ServiceWasteTypeDropdown;
