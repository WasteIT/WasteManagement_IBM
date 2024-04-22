import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import 'chartjs-adapter-date-fns';
import { DateRange } from './DateRange'
import { SensorControls, fetchSensorControlsData } from './SensorControls'
import Graph, { fetchGraphData } from './Graph'


const fetchDataBeforeLayout = (WrappedComponent) => {
  return (props) => {
    const { state: { name, pickup, bins, avgerageWithOneDecimal} = {} } = useLocation();
    const chartRef = useRef();
    const [sensorData, setSensorData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [graphData, setGraphData] = useState({});
    const [dateRange, setDateRange] = useState({
      startDate: new Date(new Date().setDate(new Date().getDate()-31)),
      endDate: new Date(new Date().setDate(new Date().getDate())),
    });

    useEffect(() => {
      const fetchData = async () => {
        await fetchSensorControlsData(name, setSensorData);
      };  
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        await fetchGraphData(name, sensorData, dateRange, setGraphData, setIsLoading);
      };  
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, sensorData, dateRange]);
    
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
    const fetchDataForSensor = async (wasteType, sensor) => {
      setIsLoading(true);
      try {
        const startTimestamp = Math.floor(dateRange.startDate.getTime() / 1000);
        const endTimestamp = Math.floor(dateRange.endDate.getTime() / 1000);
        const response = await fetch(`https://wasteit-backend.azurewebsites.net/singleSensorData/address/${name}/sensor/${wasteType}/${sensor}/?start=${startTimestamp}&end=${endTimestamp}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${sensor.name}`);
        }
        const newData = await response.json();
        
        const data = newData.map(entry => ({
          x: new Date(parseInt(entry.Timestamp) * 1000),
          y: entry.fill_level,
          hidden: false,
        }));

        graphData[sensor] = data;
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };

    return (
      <WrappedComponent
        {...props}
        isLoading={isLoading}
        chartRef={chartRef}
        toggleIsSensorDataVisible={toggleIsSensorDataVisible}
        dateRange={dateRange}
        graphData={graphData}
        setDateRange={setDateRange}
        sensorData={sensorData}
        name={name}
        pickup={pickup}
        bins={bins}
        avgFillLevel={avgerageWithOneDecimal}
        onSensorSelect={fetchDataForSensor}
      />
    );
  }
}

const Layout = ({ isLoading, toggleIsSensorDataVisible, sensorData, graphData, dateRange, setDateRange, name, pickup, bins, avgFillLevel, onSensorSelect }) => {
  
  return (
    <main>
      <h2 style={{ textAlign: 'center', paddingTop: '20px' }}>{name}</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="information_page">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SensorControls
              sensorData={sensorData}
              graphData={graphData}
              toggleIsSensorDataVisible={toggleIsSensorDataVisible}
              onSensorSelect={onSensorSelect}
            />
          </div>
          <div className='graph_wrapper_outer'>
            <div className='filter_options_wrapper'>
              <DateRange dateRange={dateRange} onDateChange={setDateRange} />
            </div>
            <div className="graph_wrapper_inner">
              <Graph graphData={graphData} />
            </div>
            <div className='stats_Wrapper'>
              <p>Amount of bins: {bins}</p>
              <p>Time since last pickup: {pickup}</p>
              <p>Average fill level at pickup: {avgFillLevel} %</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default fetchDataBeforeLayout(Layout);