import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

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
    const { state: { name } = {} } = useLocation();
    const chartRef = useRef();
    const [isSensorDataVisible, setIsSensorDataVisible] = useState({});
    const [sensorData, setSensorData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [graphInstance, setGraphInstance] = useState(null);
    const [dateRange, setDateRange] = useState({
      startDate: new Date(new Date().setDate(new Date().getDate() - 84)),
      endDate: new Date(new Date().setDate(new Date().getDate() - 70)),
    });

    useEffect(() => {
      const fetchSensorData = async () => {
        try {
          const response = await fetch("https://wasteit-backend.azurewebsites.net/data/" + name + "/sensor");
          if (!response.ok) {
            throw new Error('Failed to fetch sensor data');
          }
          const childrenData = await response.json();
          const initialVisibilityState = {};
          childrenData.forEach((key, index) => {
            initialVisibilityState[key] = true;
          });
          setIsSensorDataVisible(initialVisibilityState);

          Object.keys(initialVisibilityState).forEach(element => {
            fetchGraphData(name + "/sensor/" + element, element);
          });

          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching sensor data:', error);
        }
      };
      fetchSensorData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, dateRange]);

    const fetchGraphData = async (path, label) => {
      try {
        const startTimestamp = Math.floor(dateRange.startDate.getTime() / 1000);
        const endTimestamp = Math.floor(dateRange.endDate.getTime() / 1000);
        
        const response = await fetch(`https://wasteit-backend.azurewebsites.net/sensor/${path}/?start=${startTimestamp}&end=${endTimestamp}`);
        
        const jsonData = await response.json();
        

        const sensorData = [];

        jsonData.forEach(entry => {
          const fillLevel = entry.fill_level;
          const timestamp = new Date(parseInt(entry.timestamp) * 1000);
         
          sensorData.push({ x: timestamp, y: fillLevel });
        });

        setSensorData(prevState => ({
          ...prevState,
          [label]: sensorData
        }));

        setIsSensorDataVisible(prevState => ({
          ...prevState,
          [label]: true
        }));
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    useEffect(() => {
      if (!isLoading && Object.keys(sensorData).length > 0) {
        buildChart();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isSensorDataVisible]);

    const buildChart = () => {

      if (graphInstance) {
        graphInstance.destroy();
      }

      const chartRefCurrent = chartRef.current.getContext('2d');

      const datasets = Object.keys(sensorData).map(label => ({
        label: label,
        data: sensorData[label],
        borderColor: getRandomColor(label),
        backgroundColor: 'rgba(255, 255, 255, 0)',
        hidden: !isSensorDataVisible[label]
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

      setGraphInstance(newGraphInstance)
    };

    const toggleIsSensorDataVisible = label => {
      setIsSensorDataVisible(prevState => ({
        ...prevState,
        [label]: !prevState[label]
      }));
    };

    

    return (
      <WrappedComponent
        {...props}
        isLoading={isLoading}
        chartRef={chartRef}
        toggleIsSensorDataVisible={toggleIsSensorDataVisible}
        isSensorDataVisible={isSensorDataVisible}
        dateRange={dateRange}
        setDateRange={setDateRange}
        name={name}
      />
    );
  };
};

const Layout = ({ isLoading, chartRef, toggleIsSensorDataVisible, isSensorDataVisible, dateRange, setDateRange, name }) => {
  return (
    <main>
       <h2 style={{textAlign: "center", paddingTop: "20px"}}>{name}</h2>
      {isLoading ? (
        <div></div>
      ) : (
        <div className="information_page">
          <Form className="fraction_filter">
            {Object.keys(isSensorDataVisible).map((label, index) => (
              <Form.Check
                className='temp_Form'
                style={{backgroundColor: getRandomColor(label), color: '#fff',
                padding: 10, paddingRight: 15, width: "12rem",}}
                key={index}
                type="checkbox"
                id={label}
                label={label}
                checked={isSensorDataVisible[label]}
                onChange={() => toggleIsSensorDataVisible(label)}
              />
            ))}
          </Form>
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
                  isLoading = false;
                }}
              />
              <input
                type="date"
                value={dateRange.endDate.toISOString().split('T')[0]}
                onChange={e => {
                  //console.log("This is my target value: " + e.target.value)
                  if(dateRange.startDate.toISOString().split('T')[0] < e.target.value){
                    setDateRange(prev => ({...prev, endDate: new Date(e.target.value)}))
                  } else {
                    var selectedDate = new Date(e.target.value)
                    selectedDate.setDate(selectedDate.getDate() - 30);
                    setDateRange(prev => ({...prev, startDate: selectedDate, endDate: new Date(e.target.value) }))
                  }
                  isLoading = false
                  }}
              />
            </div>
            <div className='graph_wrapper_inner'>
              <canvas className='chart' ref={chartRef} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default fetchDataBeforeLayout(Layout);
