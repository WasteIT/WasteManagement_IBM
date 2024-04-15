import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import ServiceWasteTypeDropdown from './ServiceWasteTypeDropdown';

const getRandomColor = (label) => {
  switch (label) {
    case 'General waste':
      return `rgba(19, 13, 15, 1)`;
    case 'Food':
      return `rgba(0, 178, 90, 1)`;
    case 'Cardboard':
      return `rgba(190, 160, 102, 1)`;
    case 'Metal':
      return `rgba(87, 109, 122, 1)`;
    case 'Plastic':
      return `rgba(146, 52, 148, 1)`;
    case 'Glass':
      return `rgba(96, 195, 174, 1)`;
    case 'Paper':
      return `rgba(0, 132, 194, 1)`;
    case 'Carton':
      return `rgba(187, 155, 106, 1)`;
    case 'Textiles':
      return `rgba(139, 69, 19, 1)`;
    case 'Dangerous':
        return `rgba(237, 28, 47, 1)`;
    default:
      return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
  }
};

const fetchDataBeforeLayout = (WrappedComponent) => {
  return (props) => {
    const { state: { name} = {} } = useLocation();
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
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Procent Full',
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
        console.log('Updating graph data for', wasteType);
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
        console.log(graphData)
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
        pickup={name.pickup}
        bins={name.bins}
        onSensorSelect={fetchDataForSensor}
      />
    );
  }
}

const Layout = ({ isLoading, chartRef, toggleIsSensorDataVisible, sensorData, graphData, dateRange, setDateRange, name, pickup, bins, onSensorSelect }) => {

  return (
    <main>
      <h2 style={{ textAlign: 'center', paddingTop: '20px' }}>{name}</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="information_page">
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
          <div className='graph_wrapper_outer'>
            <div className='filter_options_wrapper'>
              <input
                type="date"
                value={dateRange.startDate.toISOString().split('T')[0]}
                onChange={e => {
                  if(dateRange.endDate.toISOString().split('T')[0] > e.target.value){
                    setDateRange(prev => ({...prev, startDate: new Date(e.target.value)}))
                  } else {
                    var selectedDate = new Date(e.target.value)
                    selectedDate.setDate(selectedDate.getDate() + 30);
                    setDateRange(prev => ({...prev, startDate: new Date(e.target.value), endDate: selectedDate }))
                  }
                }}
              />
              <input
                type="date"
                value={dateRange.endDate.toISOString().split('T')[0]}
                onChange={e => {
                  if(dateRange.startDate.toISOString().split('T')[0] < e.target.value){
                    setDateRange(prev => ({...prev, endDate: new Date(e.target.value)}))
                  } else {
                    var selectedDate = new Date(e.target.value)
                    selectedDate.setDate(selectedDate.getDate() - 30);
                    setDateRange(prev => ({...prev, startDate: selectedDate, endDate: new Date(e.target.value) }))
                  }
                }}
              />
            </div>
            <div className="graph_wrapper_inner">
              <canvas className="chart" ref={chartRef} />
            </div>
            <div className='stats_Wrapper'>
              Amount of bins: {bins}
              <br></br>
              Time since last pickup: {pickup}

            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default fetchDataBeforeLayout(Layout);

