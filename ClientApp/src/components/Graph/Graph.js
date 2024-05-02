import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { getWasteFractionColor } from '../../utils/GetColour';

export const fetchAllGraphData = async (wasteTypeName, name, sensorData, dateRange, setGraphData, setIsLoading, setVisibleFractions) => {
    if (Object.keys(sensorData).length > 0) {
        try {
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
                y: entry.FillLevelSum
              }));
     
              graphData[wasteType] = data;
            }
            setGraphData(graphData);
            if (wasteTypeName && graphData.hasOwnProperty(wasteTypeName)) {
                setVisibleFractions(prevFractions => ({
                    ...prevFractions,
                    [wasteTypeName]: true
                }));
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
}

export const fetchSingleGraphData = async (name, wasteType, sensor, graphData, dateRange, setIsLoading) => {
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
        y: entry.fill_level
      }));

      graphData[sensor] = data;

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

const Graph = ({ graphData, visibleFractions }) => {
    const chartRef = useRef();
    
    
    useEffect(() => {
        buildChart();
        const currentChartRef = chartRef.current;

        return () => {
            if (currentChartRef.chart) {
                currentChartRef.chart.destroy();
            }
        };
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graphData, visibleFractions]);

    const buildChart = () => {
        const chartRefCurrent = chartRef.current.getContext('2d');

        const datasets = Object.keys(graphData).map(label => ({
            label: label,
            data: graphData[label].filter(() => visibleFractions[label]),
            borderColor: getWasteFractionColor(label),
            backgroundColor: 'rgba(255, 255, 255, 0)',
        }));

        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        const newGraphInstance = new Chart(chartRefCurrent, {
            type: 'line',
            data: { datasets },
  
            options: {
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        beginAtZero: true,
                        title: { display: true, text: 'Fill level percentage' }
                    },
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: { second: 'HH' }
                        }
                    }
                },
            }
        });

        chartRef.current.chart = newGraphInstance;
    };

    return <canvas ref={chartRef} className="chart" />;
};

export default Graph;
