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
        <Accordion class="report-page-accordion" defaultActiveKey="1">
          <Accordion.Item className="report-page-waste-fraction-checkbox" style={{background: getWasteFractionColor(`${wasteType} childBackground`)}}>
            <Accordion.Header 
              className='report-accordion-button'
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
                <div className='report-page-accordion-body-wrapper-inner'>
                  <FormCheck type="checkbox" className="report-page-accordion-body-input" 
                    checked={checkedSecondaryValue(sensor)}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); 
                      onSensorSelect(wasteType, sensor)
                      onSecondaryChange(sensor)
                    }}/>
                  {sensor.name} Bin #{index + 1}
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    }
    
    export default ServiceWasteTypeDropdown;


