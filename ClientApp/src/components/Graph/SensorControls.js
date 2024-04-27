import React from 'react';
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

export const SensorControls = ({ sensorData, graphData, onSensorSelect, setGraphData, currentWasteCategory, setVisibleFractions, visibleFractions }) => {
    
    const toggleIsSensorDataVisible = (wasteType) => {
        setVisibleFractions(prevFractions => ({
            ...prevFractions,
            [wasteType]: !prevFractions[wasteType]
        }));
    };

    const changeInputButton = (wasteType) => {
        return visibleFractions[wasteType] ?? false
    }

    return (
        <div>
            <div style={{margin: '0rem 2rem 2rem 2rem'}}>
                <div style={{background: getWasteFractionColor(currentWasteCategory), color: 'white', fontWeight: 'bold', borderRadius: '30px 30px 0px 0px', padding: '1rem 1rem 0.5rem 2rem'}}>
                    {currentWasteCategory}
                </div>
                <div style={{background: getWasteFractionColor(`${currentWasteCategory} 4th`), color: 'white', borderRadius: '0px 0px 30px 30px', padding: '1rem 1rem 0.5rem 1rem', height: '12rem', boxShadow: '-10px 30px 50px rgba(33, 82, 75, 0.5)'}}>
                    {sensorData[currentWasteCategory].map((sensor, index) => (
                        <div key={index} style={{display: 'flex', padding: '0.5rem'}}>
                            <FormCheck
                                style={{padding: '0rem 0.5rem 0rem 0rem'}}
                                checked={changeInputButton(sensor)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation(); 
                                    onSensorSelect(currentWasteCategory, sensor)
                                    toggleIsSensorDataVisible(sensor)
                                }}
                            />
                            {sensor.name} Bin #{index + 1}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '2rem', padding: '1rem', color: 'white', background: '#141414', borderRadius: '30px', boxShadow: '-10px 30px 50px rgba(33, 82, 75, 0.5)' }}>
                <div style={{margin: '0.5rem'}}>
                    Compare with other bins and waste types
                </div>
                {Object.keys(sensorData).filter(wasteType => wasteType !== currentWasteCategory).map((wasteType, index) => (
                    <ServiceWasteTypeDropdown
                        key={index}
                        wasteType={wasteType}
                        sensors={sensorData[wasteType]}
                        onSensorSelect={onSensorSelect}
                        checkedPrimaryValue={changeInputButton(wasteType)}
                        checkedSecondaryValue={(arg) => changeInputButton(arg)}
                        onPrimaryChange={() => toggleIsSensorDataVisible(wasteType)}
                        onSecondaryChange={(sensor) => toggleIsSensorDataVisible(sensor)}
                    />
                ))}
            </div>
        </div>
    );
};
