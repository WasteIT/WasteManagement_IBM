import React, { Component } from 'react';
import Chart from 'chart.js/auto';

export default class Graph extends Component {
  chartRef = React.createRef();
  chart = null;

  componentDidMount() {
    this.buildChart();
  }

  buildChart() {
    const chartRef = this.chartRef.current.getContext('2d');

    this.chart = new Chart(chartRef, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Disse skal ændres ift knapperne.
        datasets: [ //Vi skal bruge det rigtige dataset 
          {
            label: 'Bin 1',
            data: [20, 30, 40, 50, 60, 70, 80], //Bin type 1
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Bin 2',
            data: [30, 40, 50, 60, 70, 80, 90], //Bin type 2
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
          {
            label: 'Bin 3',
            data: [40, 50, 60, 70, 80, 90, 100], //Bin type 3, osv...
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
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
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}
