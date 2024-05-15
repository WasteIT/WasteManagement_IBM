import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FormCheck } from 'react-bootstrap';
import { getWasteFractionColor } from '../../utils/GetColour';

/**
 * ServiceWasteTypeDropdown is a functional component in React that represents a dropdown menu for selecting waste types and associated sensors.
 * 
 * @param {object} props - Props passed to the ServiceWasteTypeDropdown component.
 * @param {string} props.wasteType - The type of waste for which sensors are being displayed.
 * @param {array} props.sensors - An array containing sensor data for the specified waste type.
 * @param {function} props.onSecondaryChange - A function to handle changes in secondary selections (sensors).
 * @param {function} props.onSensorSelect - A function to handle the selection of sensors.
 * @param {boolean} props.checkedPrimaryValue - A boolean value indicating whether the primary checkbox for the waste type is checked.
 * @param {function} props.checkedSecondaryValue - A function to check if a secondary checkbox (sensor) is checked.
 * @param {function} props.onPrimaryChange - A function to handle changes in the primary checkbox for the waste type.
 * 
 * @returns {JSX.Element} JSX element representing the ServiceWasteTypeDropdown component.
 */


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


