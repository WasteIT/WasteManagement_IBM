import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';

export default class Graph extends Component {
  chartRef = React.createRef();
  chart = null;
  

  state = {
    sensorData: [{x: "0", y: 0}]
  };

  async componentDidMount() {
    await this.initializeFirebase();
    await this.fetchSensorData("/sensor/11");
    this.buildChart();
  }

  async initializeFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyBrUXDmmZzLtLWYNdqwh4jhFbQvR51SP4A",
      authDomain: "wasteit-193de.firebaseapp.com",
      databaseURL: "https://wasteit-193de-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "wasteit-193de",
      storageBucket: "wasteit-193de.appspot.com",
      messagingSenderId: "956930927762",
      appId: "1:956930927762:web:b0d69690f1091005f04a4b",
      measurementId: "G-DJY9G44K2M"
    };

    const app = initializeApp(firebaseConfig);
  }

  async fetchSensorData() {
    const db = getDatabase();

    const sensor3Ref = ref(db, "/sensor/3");

    const fetchData = () => {
      onValue(sensor3Ref, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          Object.keys(data).forEach((key) => {
            const row = data[key];
            const time = row.Timestamp;
            const fillLevel = row.fill_level;
            
            this.state.sensorData.push({x: time, y: fillLevel});
          });
        } else {
          console.log('No data available in the database.');
        }
      });
    };

    fetchData();
  }

  buildChart() {
    const chartRef = this.chartRef.current.getContext('2d');

    this.chart = new Chart(chartRef, {
      type: 'line',
      data: {
        //labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Disse skal ændres ift knapperne.
        datasets: [ 
          {
            label: 'Bin 1',
            data: this.state.sensorData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {/*{
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
          },*/}
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
    return (
      <div>
        <div><canvas ref={this.chartRef} /></div>
        {/*<div>
          <h2>Sensor Data</h2>
          {this.state.sensorData ? (
            <pre>{JSON.stringify(this.state.sensorData, null, 2)}</pre>
          ) : (
            <p>Loading...</p>
          )}
          </div>*/}
      </div>
    );
  }
}
