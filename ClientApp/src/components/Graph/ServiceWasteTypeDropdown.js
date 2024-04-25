import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';
import { Form } from 'react-router-dom';
import { FormCheck } from 'react-bootstrap';

const ServiceWasteTypeDropdown = ({ wasteType, sensors, onChange, onChangeSensor, graphData, onSensorSelect, onWasteTypeSelect }) => {
  return (
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>{wasteType}
            <FormCheck onClick={() => {
              onChange(graphData)
            }}>
            </FormCheck>
            </Accordion.Header>
            <Accordion.Body onClick={() => {
              onSensorSelect(wasteType, sensors)
              onChangeSensor(sensors)
              {sensors.map((sensor, index) => (
                <div>
                  {sensor.name} sensor: {index + 1}
                </div>
              ))}}}>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
  );
    }
    
    export default ServiceWasteTypeDropdown;


