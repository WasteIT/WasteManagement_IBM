import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const ServiceWasteTypeDropdown = ({ wasteTypes, onSelect }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Waste Types
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {wasteTypes.map((wasteType, index) => (
                    <Dropdown.Item key={index} onSelect={() => onSelect(wasteType)}>
                        {wasteType}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ServiceWasteTypeDropdown;
