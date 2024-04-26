import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';
import { Form } from 'react-router-dom';
import { FormCheck } from 'react-bootstrap';
import { getWasteFractionColor } from '../../utils/GetColour';

const ServiceWasteTypeDropdown = ({ wasteType, sensors, onChange, onChangeSensor, onSensorSelect, graphData, checkedValue}) => {

  const [isCollapsed, setIsCollapsed] = useState(true); //This is because for some reason it is impossible to access the accordian-button-element 

  const handleToggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
        <Accordion class="accordion accordion-flush">
          <Accordion.Item style={{background: getWasteFractionColor(`${wasteType} 4th`)}}>
            <Accordion.Header 
              style={{
                background: getWasteFractionColor(wasteType), 
                borderRadius: !isCollapsed ? '25px' : '25px 25px 0px 0px',
                transition: 'border-radius 0.3s ease' 
              }} 
              onClick={handleToggleAccordion}>
              <FormCheck type="checkbox" 
              checked={checkedValue}
              onClick={(e) => {
                e.stopPropagation();
                onChange(graphData)
              }}>
              </FormCheck>
              {wasteType}
            </Accordion.Header>
            <Accordion.Body>
              {sensors.map((sensor, index) => (
              <div style={{display: 'flex', color: 'white'}}>
                <FormCheck type="checkbox" style={{padding: '0.1rem 0.5rem 0.1rem 0rem'}} 
                checked={checkedValue}
                onClick={(e) => {
                  onSensorSelect(wasteType, sensor)
                  onChangeSensor(sensor)
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


