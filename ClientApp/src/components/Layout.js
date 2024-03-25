import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const fetchDataBeforeLayout = (WrappedComponent) => {
  return (props) => {
    const { state: { name } = {} } = useLocation();
    const chartRef = useRef();
    const [isSensorDataVisible, setIsSensorDataVisible] = useState({});
    const [sensorData, setSensorData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [graphInstance, setGraphInstance] = useState(null);

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
    }, [name]);


    const fetchGraphData = async (path, label) => {
      try {
        const response = await fetch("https://wasteit-backend.azurewebsites.net/sensor/" + path);
        const jsonData = await response.json();
        const sensorData = [];
        jsonData.forEach(entry => {
          const parsedEntry = JSON.parse(entry);
          const timestamp = new Date(parseInt(parsedEntry[1].Timestamp) * 1000);

          const fillLevel = parsedEntry[1].fill_level;
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
    }, [isLoading, sensorData, isSensorDataVisible]);

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

      const newgraphInstance = new Chart(chartRefCurrent, {
        type: 'line',
        data: {
          datasets: datasets
        },
        options: {
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

      setGraphInstance(newgraphInstance);
    };

    const toggleisSensorDataVisible = label => {
      setIsSensorDataVisible(prevState => ({
        ...prevState,
        [label]: !prevState[label]
      }));
    };

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

    return <WrappedComponent {...props} isLoading={isLoading} chartRef={chartRef} toggleisSensorDataVisible={toggleisSensorDataVisible} isSensorDataVisible={isSensorDataVisible} />;
  };
};

const Layout = ({ isLoading, chartRef, toggleisSensorDataVisible, isSensorDataVisible }) => {
  return (
    <main>
      {isLoading ? (
        <div></div>
      ) : (
      <div className="information_page">
        <Form className="fraction_filter">
          {Object.keys(isSensorDataVisible).map((label, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              id={label}
              label={label}
              checked={isSensorDataVisible[label]}
              onChange={() => toggleisSensorDataVisible(label)}
            />
          ))}
        </Form>
        <div className='graph_wrapper_outer'>
          <div className='filter_options_wrapper'>
            <h3>Filter options:</h3>
            <button type='button' className='btn button filter_graph_button'>Past week</button>
            <button type='button' className='btn button filter_graph_button'>Past month</button>
            <button type='button' className='btn button filter_graph_button'>Custom filter</button>
          </div>
          <div className='graph_wrapper_inner'>
            <canvas ref={chartRef} />
          </div>
        </div>
      </div>
    )}
    </main>
  );
};

export default fetchDataBeforeLayout(Layout);
