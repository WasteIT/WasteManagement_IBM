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


export const SensorControls = ({ sensorData, graphData, onSensorSelect, setGraphData, currentWasteCategory }) => {

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

    const filteredWasteTypes = Object.keys(sensorData).filter(wasteType => wasteType !== currentWasteCategory);

    return (
        <div>
            <div style={{justifyContent: 'center', background: 'black', marginRight: '3rem', marginLeft: '3rem', borderRadius: '20px'}}>
                <div style={{justifyContent: 'center', background: 'black', marginRight: '3rem', marginLeft: '3rem', borderRadius: '20px'}}>
                    <ServiceWasteTypeDropdown
                        wasteType={currentWasteCategory}
                        sensors={sensorData[currentWasteCategory]}
                        onChangeSensor={(sensor) => toggleIsSensorDataVisible(sensor)} // OBS: Dette er rigtigt, hvis hver virker
                        // onChangeSensor={() => toggleIsSensorDataVisible(wasteType)}
                        checkedValue={!graphData[currentWasteCategory].some(dataPoint => dataPoint.hidden)}
                        onChange={() => toggleIsSensorDataVisible(currentWasteCategory)} />

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '2rem 1rem 2rem 2rem' }}>
                    {filteredWasteTypes.map((wasteType, index) => (
                        <div key={index} style={{ display: 'inline-block', marginRight: '20px', marginTop: '10px' }}>
                            <ServiceWasteTypeDropdown
                                //For sensor
                                wasteType={wasteType}
                                sensors={sensorData[wasteType]}
                            onChangeSensor={(sensor) => toggleIsSensorDataVisible(sensor)} // OBS: Dette er rigtigt, hvis hver virker
                            // onChangeSensor={() => toggleIsSensorDataVisible(wasteType)}

                                //For wastebin
                                checkedValue={!graphData[wasteType].some(dataPoint => dataPoint.hidden)}
                                onChange={() => toggleIsSensorDataVisible(wasteType)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
