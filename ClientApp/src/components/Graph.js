import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { getRandomColor } from '../utils/GetColour';

const Graph = ({ graphData }) => {
    const chartRef = useRef();
    const currentChartRef = chartRef.current;

    useEffect(() => {
        buildChart();
        
        return () => {
            if (currentChartRef.chart) {
                currentChartRef.chart.destroy();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graphData]);

    const buildChart = () => {
        const chartRefCurrent = chartRef.current.getContext('2d');

        const datasets = Object.keys(graphData).map(label => ({
            label: label,
            data: graphData[label].filter(dataPoint => !dataPoint.hidden),
            borderColor: getRandomColor(label),
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
                        title: { display: true, text: 'Percentage Full' }
                    },
                    x: {
                        type: 'time',
                        ticks: { display: false },
                        time: {
                            unit: 'day',
                            displayFormats: { second: 'HH' }
                        }
                    }
                }
            }
        });

        chartRef.current.chart = newGraphInstance;
    };

    return <canvas ref={chartRef} className="chart" />;
};

export default Graph;
