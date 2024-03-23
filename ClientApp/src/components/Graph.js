import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';
  
export default class Graph extends Component {
  chartRef = React.createRef();
  chart = null;
  
  state = {
    sensorData: {},
    sensorVisibility: {}
  };
  
  async componentDidMount() {
    await this.initializeFirebase();
    await this.fetchSensorData("/sensor/3", 'Bin 1');
    await this.fetchSensorData("/sensor/3", 'Bin 2');
    await this.fetchSensorData("/sensor/3", 'Bin 3');
    this.buildChart();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.sensorVisibility !== prevProps.sensorVisibility) {
      this.toggleDatasetVisibility();
    }
  }

  async initializeFirebase() {
    const firebaseConfig = {
      
    };
  
    const app = initializeApp(firebaseConfig);
  }

  async fetchSensorData(path, label) {
    const db = getDatabase();
    const sensorRef = ref(db, path);
    const fetchData = () => {
      onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const sensorData = [];
          Object.keys(data).forEach((key) => {
            const row = data[key];
            const time = row.Timestamp;
            const fillLevel = row.fill_level*Math.random();
            sensorData.push({ x: time, y: fillLevel });
          });
          this.setState(prevState => ({
            sensorData: {
              ...prevState.sensorData,
              [label]: sensorData
            },
            sensorVisibility: {
              ...prevState.sensorVisibility,
              [label]: true
            }
          }));
        } else {
          console.log('No data available in the database.');
        }
      });
    };
  
      fetchData();
    }
  
    buildChart() {
      const chartRef = this.chartRef.current.getContext('2d');
  
      const datasets = Object.keys(this.state.sensorData).map(label => ({
        label: label,
        data: this.state.sensorData[label],
        borderColor: this.getRandomColor(label),
        backgroundColor: 'rgba(255, 255, 255, 0)',
        hidden: !this.state.sensorVisibility[label]
      }));
  
      this.chart = new Chart(chartRef, {
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
  }
  
  
  toggleDatasetVisibility() {
    this.chart.data.datasets.forEach(dataset => {
      dataset.hidden = !this.props.sensorVisibility[dataset.label];
    });
    this.chart.update();
  }
  
  getRandomColor(label) {
    switch(label) {
      case 'Bin 1':
        return `rgba(139, 69, 19, 1)`;
      case 'Bin 2':
        return `rgba(50, 50, 50, 1)`;
      case 'Bin 3':
        return `rgba(0, 0, 255, 1)`;
      default:
        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
    }
   
  }
  
  render() {
    return (
      <div>
        <div>
          <canvas ref={this.chartRef} />
        </div>
      </div>
    );
  }
}
  