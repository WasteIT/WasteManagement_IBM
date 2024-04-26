import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FormCheck } from 'react-bootstrap';
import { getWasteFractionColor } from '../../utils/GetColour';

const ServiceWasteTypeDropdown = ({ wasteType, sensors, onSecondaryChange, onSensorSelect, checkedPrimaryValue, checkedSecondaryValue, onPrimaryChange }) => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleAccordion = (e) => {
    e.preventDefault();
    setIsCollapsed(!isCollapsed);
  };
  
  return (
        <Accordion class="accordion" style={{marginBottom: '15px'}} defaultActiveKey="0">
          <Accordion.Item style={{background: getWasteFractionColor(`${wasteType} 4th`)}}>
            <Accordion.Header 
              style={{
                background: getWasteFractionColor(wasteType), 
                borderRadius: !isCollapsed ? '25px' : '25px 25px 0px 0px',
                transition: 'border-radius 0.3s ease' 
              }} 
              onClick={handleToggleAccordion}>
              <FormCheck type="checkbox" 
                checked={checkedPrimaryValue}
                onClick={(e) => {
                  e.stopPropagation()
                  onPrimaryChange()                
                }}
              />    
              {wasteType}
            </Accordion.Header>
            <Accordion.Body>
              {sensors.map((sensor, index) => (
              <div style={{display: 'flex', color: 'white'}}>
                <FormCheck type="checkbox" style={{padding: '0.1rem 0.5rem 0.1rem 0rem'}} 
                checked={checkedSecondaryValue(sensor)}
                onClick={(e) => {
                  e.stopPropagation(); 
                  e.preventDefault();
                  onSensorSelect(wasteType, sensor)
                  onSecondaryChange(sensor)
                }}>
                </FormCheck>
                {sensor.name} Bin #{index + 1}
              </div>
            ))}
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    }
    
    export default ServiceWasteTypeDropdown;


