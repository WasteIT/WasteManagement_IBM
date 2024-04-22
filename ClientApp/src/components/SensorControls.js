import React from 'react';
import Form from 'react-bootstrap/Form';
import ServiceWasteTypeDropdown from './ServiceWasteTypeDropdown';

export const SensorControls = ({ sensorData, graphData, toggleIsSensorDataVisible, onSensorSelect }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Object.keys(sensorData).map((wasteType, index) => (
                <div key={index} style={{ display: 'inline-block', marginRight: '20px', marginTop: '0px' }}>
                    <ServiceWasteTypeDropdown
                        wasteType={wasteType}
                        sensors={sensorData[wasteType]}
                        onChange={(sensor) => toggleIsSensorDataVisible(sensor)}
                        onSensorSelect={onSensorSelect}
                    />
                    <Form.Check
                        type="checkbox"
                        id={`checkbox-${index}`}
                        label={wasteType}
                        checked={!graphData[wasteType].some(dataPoint => dataPoint.hidden)}
                        onChange={() => toggleIsSensorDataVisible(wasteType)}
                    />
                </div>
            ))}
        </div>
    );
};
