import { secondsToHours } from 'date-fns';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const ServiceWasteTypeDropdown = ({ wasteType, sensors}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {wasteType}
      </Dropdown.Toggle>
      <Dropdown.Menu>
      <Dropdown.Item>{sensors}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ServiceWasteTypeDropdown;
