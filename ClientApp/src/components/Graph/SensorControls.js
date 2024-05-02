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
            <div className='sensor-control-wrapper-inner'>
                <div className="sensor-control-main-waste-fraction-title" style={{background: getWasteFractionColor(currentWasteCategory)}}>
                    {currentWasteCategory}
                </div>
                <div className="sensor-control-main-waste-fraction-input-wrapper-outer" style={{background: getWasteFractionColor(`${currentWasteCategory} 4th`)}}>
                    {sensorData[currentWasteCategory].map((sensor, index) => (
                        <div key={index} className='sensor-control-main-waste-fraction-input-wrapper-inner'>
                            <FormCheck
                                className="sensor-control-main-waste-fraction-input"
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
            <div className="flex-column sensor-control-other-waste-fraction-input-wrapper-outer">
                <div className='sensor-control-other-waste-fraction-title '>
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
