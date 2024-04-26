import React from 'react';
import Form from 'react-bootstrap/Form';
import { FormCheck } from 'react-bootstrap';
import ServiceWasteTypeDropdown from './ServiceWasteTypeDropdown';
import { getWasteFractionColor } from '../../utils/GetColour';


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
            <div style={{margin: '0rem 2rem 2rem 2rem',}}>
                <div style={{background: getWasteFractionColor(currentWasteCategory), color: 'white', fontWeight: 'bold', borderRadius: '30px 30px 0px 0px', padding: '1rem 1rem 0.5rem 2rem'}}>
                    {currentWasteCategory}
                </div>
                <div style={{background: getWasteFractionColor(`${currentWasteCategory} 4th`), color: 'white', borderRadius: '0px 0px 30px 30px', padding: '1rem 1rem 0.5rem 1rem', height: '12rem', boxShadow: '-10px 30px 100px rgba(33, 82, 75, 0.5)'}}>
                    {sensorData[currentWasteCategory].map((sensor, index) => (
                    <div style={{display: 'flex', padding: '0.5rem', }}>
                        <FormCheck style={{padding: '0rem 0.5rem 0rem 0rem'}}
                        checked={!graphData[currentWasteCategory].some(dataPoint => dataPoint.hidden)}
                        onClick={(e) => {
                            toggleIsSensorDataVisible(sensor)
                        }}>
                        </FormCheck>
                        {sensor.name} Bin #{index + 1}  
                    </div> //This should probably be the real bin number? ^
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '2rem', padding: '1rem', color: 'white', background: '#141414', borderRadius: '30px', boxShadow: '-10px 30px 100px rgba(33, 82, 75, 0.5)' }}>
                <div style={{margin: '0.5rem'}}>
                    Compare with other bins and waste types
                </div>
                {filteredWasteTypes.map((wasteType, index) => (
                    <div key={index} style={{ display: 'inline-block', marginTop: '10px' }}>
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
    );
};
