import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Chart from 'chart.js/auto';
import Form from 'react-bootstrap/Form';

const Layout = () => {
  const { state: { name } = {} } = useLocation();

  const chartRef = useRef();
  const [isSensorDataVisible, setIsSensorDataVisible] = useState({});
  const [sensorData, setSensorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [graphInstance, setGraphInstance] = useState(null);

  useEffect(() => {
    fetchNumberOfSensors(name + "/sensor");
    Object.keys(isSensorDataVisible).forEach(element =>  {
      fetchGraphData(name + "/sensor/" + element, element);
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && Object.keys(sensorData).length > 0) {

      buildChart();
    }
  }, [isLoading, sensorData, isSensorDataVisible]);

  const fetchNumberOfSensors = async (path) => {
    try {
      const response = await fetch('http://localhost:5000/data/' + path);
      if (!response.ok) {
        throw new Error('Failed to fetch children data');
      }
      const childrenData = await response.json();

      const initialVisibilityState = {};
      Object.keys(childrenData).forEach((key, index) => {
         if(index != 0) initialVisibilityState[key] = true;
      });
      setIsSensorDataVisible(initialVisibilityState);
    } catch (error) {
      console.error('Error fetching children data:', error);
    }
  };

  const fetchGraphData = async (path, label) => {
    try {
      const response = await fetch('http://localhost:5000/sensor/' + path);
      const jsonData = await response.json();
      const sensorData = [];
      jsonData.forEach((entry) => {
        const parsedEntry = JSON.parse(entry);
        var timestamp = parsedEntry[1].Timestamp;
        var fillLevel = parsedEntry[1].fill_level;
        sensorData.push({
          x: timestamp,
          y: fillLevel
        });
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
  }

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
            title: {
              display: true,
              text: 'Time',
            },
          },
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
      case '1':
        return `rgba(139, 69, 19, 1)`;
      case '2':
        return `rgba(50, 50, 50, 1)`;
      case '3':
        return `rgba(0, 0, 255, 1)`;
      case '4':
        return `rgba(0, 128, 0, 1)`;
      case '5':
        return `rgba(255, 255, 0, 1)`;
      default:
        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
    }
  };

  return (
    <main>
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
    </main>
  );
};

export default Layout;
