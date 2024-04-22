import React from 'react';
import Form from 'react-bootstrap/Form';
import ServiceWasteTypeDropdown from './ServiceWasteTypeDropdown';


export const fetchSensorControlsData = async (name, setSensorData) => {
    try {
        const sensorResponse = await fetch(`https://wasteit-backend.azurewebsites.net/data/${name}/sensor`);
        if (!sensorResponse.ok) {
            throw new Error('Failed to fetch sensor data');
        }
        const sensorData = await sensorResponse.json();
        setSensorData(sensorData);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
    }
}


export const SensorControls = ({ sensorData, graphData, onSensorSelect, setGraphData }) => {

    const toggleIsSensorDataVisible = (wasteType) => {
        const updatedGraphData = { ...graphData };
        if (updatedGraphData[wasteType]) {
          updatedGraphData[wasteType] = updatedGraphData[wasteType].map(dataPoint => ({
            ...dataPoint,
            hidden: !dataPoint.hidden,
          }));
          setGraphData(updatedGraphData);
        } else {
          console.error(`Graph data for ${wasteType} is undefined.`);
        }
      };

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
