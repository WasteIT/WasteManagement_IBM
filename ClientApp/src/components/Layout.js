import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { getRandomColor } from '../utils/GetColour';
import { DateRange } from './DateRange'
import { SensorControls } from './SensorControls'

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
        try {
          // Fetch sensor data
          const sensorResponse = await fetch(`https://wasteit-backend.azurewebsites.net/data/${name}/sensor`);
          if (!sensorResponse.ok) {
            throw new Error('Failed to fetch sensor data');
          }
          const sensorData = await sensorResponse.json();
          setSensorData(sensorData);
  
          // Fetch graph data for each waste type
          const graphData = {};
          const startTimestamp = Math.floor(dateRange.startDate.getTime() / 1000);
          const endTimestamp = Math.floor(dateRange.endDate.getTime() / 1000);
       
          for (const wasteType in sensorData) {
            const response = await fetch(`https://wasteit-backend.azurewebsites.net/sensor/address/${name}/sensor/${wasteType}/?start=${startTimestamp}&end=${endTimestamp}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch graph data for ${wasteType}`);
            }
            const jsonData = await response.json();
            
            const data = jsonData.map(entry => ({
              x: new Date(parseInt(entry.Timestamp) * 1000),
              y: entry.FillLevelSum,
              hidden: false,
            }));
   
            graphData[wasteType] = data;
          }
          setGraphData(graphData);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, dateRange]);

    useEffect(() => {
      if (!isLoading && Object.keys(graphData).length > 0) {
        buildChart();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, graphData]);
   
    
    const buildChart = () => {
      if (chartRef.current) {
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }
  
        const chartRefCurrent = chartRef.current.getContext('2d');

        const datasets = Object.keys(graphData).map(label => ({
          label: label,
          data: graphData[label].filter(dataPoint => !dataPoint.hidden),
          borderColor: getRandomColor(label),
          backgroundColor: 'rgba(255, 255, 255, 0)',
        }));
  
        const newGraphInstance = new Chart(chartRefCurrent, {
          type: 'line',
          data: {
            datasets: datasets
          },
          options: {
            plugins: {
              legend: {
                display: false,
              }
            },
            scales: {
              y: {
                suggestedMin: 0,
                suggestedMax: 100,
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Percentage Full',
                },
              },
              x: {
                type: 'time',
                ticks:{
                  display: false
                }, 
                time: {
                  unit: 'day',
                  displayFormats: {
                    second: 'HH',
                  }
                },
              }
            },
          },
        });
  
        chartRef.current.chart = newGraphInstance;
      }
    };

    const toggleIsSensorDataVisible = (wasteType) => {
      const updatedGraphData = { ...graphData };
      if (updatedGraphData[wasteType]) {
        updatedGraphData[wasteType] = updatedGraphData[wasteType].map(dataPoint => ({
          ...dataPoint,
          hidden: !dataPoint.hidden,
        }));
        setGraphData(updatedGraphData);
        buildChart();
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

const Layout = ({ isLoading, chartRef, toggleIsSensorDataVisible, sensorData, graphData, dateRange, setDateRange, name, pickup, bins, avgFillLevel, onSensorSelect }) => {
  
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
              <canvas className="chart" ref={chartRef} />
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