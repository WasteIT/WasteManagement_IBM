import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';
import { Form } from 'react-router-dom';
import { FormCheck } from 'react-bootstrap';

const ServiceWasteTypeDropdown = ({ wasteType, sensors, onChange, onChangeSensor, graphData, sensordata, onSensorSelect, onWasteTypeSelect, checkedValue}) => {
  return (
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>
              <FormCheck type="checkbox" 
              checked={checkedValue}
              
              onClick={(e) => {
                e.stopPropagation();
                onChange(graphData)
              }}>
              </FormCheck>
              {wasteType}
            </Accordion.Header>
            <Accordion.Body onClick={() => {
              onChangeSensor(sensors)
              }}>
              {sensors.map((sensor, index) => (
              <div style={{display: 'flex'}}>
                <FormCheck type="checkbox" 
                checked={checkedValue}
                onClick={(e) => {
                  onChangeSensor(sensor)
                }}>
                </FormCheck>
                {sensor.name} sensor: {index + 1}
              </div>
            ))}
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
  );
    }
    
    export default ServiceWasteTypeDropdown;


