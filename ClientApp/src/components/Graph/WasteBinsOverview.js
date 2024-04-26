import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'chartjs-adapter-date-fns';
import { DateRange } from './DateRange'
import { SensorControls, fetchSensorControlsData } from './SensorControls'
import WasteFractionInfoBox from './WasteFractionInfoBox'
import Graph, { fetchAllGraphData, fetchSingleGraphData } from './Graph';
import './Layout.css';
import './../../style.css';
import Card from 'react-bootstrap/Card';

const Layout = () => {
  
    const { state: { name, streetname, pickup, bins, avgerageWithOneDecimal} = {} } = useLocation();
    const [sensorData, setSensorData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [graphData, setGraphData] = useState({});
    const [dateRange, setDateRange] = useState({
      startDate: new Date(new Date().setDate(new Date().getDate()-31)),
      endDate: new Date(new Date().setDate(new Date().getDate())),
    });

    useEffect(() => {
      const fetchData = async () => {
        await fetchSensorControlsData(streetname, setSensorData);
      };  
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        await fetchAllGraphData(streetname, sensorData, dateRange, setGraphData, setIsLoading);
      };  
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [streetname, sensorData, dateRange]);
    
    const handleSensorSelect = async (wasteType, sensor) => {
      await fetchSingleGraphData(streetname, wasteType, sensor, graphData, dateRange, setIsLoading);
    };

  return (
    <main> 
      <h2 style={{ textAlign: 'center', paddingTop: '20px'}}></h2> 
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="information_page" style={{justifyContent: 'center'}}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '20rem' }}>
            
            <SensorControls style={{marginBottom: '1rem'}}
              sensorData={sensorData}
              graphData={graphData}
              onSensorSelect={handleSensorSelect}
              setGraphData={setGraphData}
              currentWasteCategory={name}
            />
          </div>
          <div>
          
          <div style={{marginBottom: '2rem'}}>
          <WasteFractionInfoBox
            wasteFraction={name}
            bins={5}>

          </WasteFractionInfoBox>
          </div>

          <Card className="card-wrapper">
            <Card.Body className="card-body">
                <h5 style={{margin: '1rem 0rem 0rem 0rem' }}>Choose a date interval</h5>
                <div className='filter_options_wrapper' style={{ }}>
                    <DateRange dateRange={dateRange} onDateChange={setDateRange} />
                </div>
                <div className="graph_wrapper_inner" style={{ backgroundColor: 'white',}}>
                    <Graph graphData={graphData} />
                </div>
                <div className='stats_Wrapper'>
                    <p>Amount of bins: {bins}</p>
                    <p>Time since last pickup: {pickup}</p>
                    <p>Average fill level at pickup: {avgerageWithOneDecimal} %</p>
                </div>
            </Card.Body>
          </Card>
          </div>
        </div>
      )}
    </main>
  );
};

export default Layout;
