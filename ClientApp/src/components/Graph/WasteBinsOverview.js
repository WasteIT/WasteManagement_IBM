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
    const [visibleFractions, setVisibleFractions] = useState({});
    const [dateRange, setDateRange] = useState({
      startDate: new Date(new Date().setDate(new Date().getDate()-31)),
      endDate: new Date(new Date().setDate(new Date().getDate())),
    });
    const isChrome = window.navigator.userAgent.includes("Chrome");

    useEffect(() => {
      const fetchData = async () => {
        await fetchSensorControlsData(streetname, setSensorData);
      };  
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        await fetchAllGraphData(name, streetname, sensorData, dateRange, setGraphData, setIsLoading, setVisibleFractions);
      };  
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [streetname, sensorData, dateRange]);
    
    const handleSensorSelect = async (wasteType, sensor) => {
      await fetchSingleGraphData(streetname, wasteType, sensor, graphData, dateRange, setIsLoading);
    };

  return (
    <main> 
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="information_page" style={{justifyContent: 'center', paddingTop: '20px'}}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '20rem' }}>
            
            <SensorControls style={{marginBottom: '1rem'}}
              sensorData={sensorData}
              graphData={graphData}
              onSensorSelect={handleSensorSelect}
              setGraphData={setGraphData}
              currentWasteCategory={name}
              setVisibleFractions={setVisibleFractions}
              visibleFractions={visibleFractions}
            />
          </div>
          <div>
          
          <div style={{marginBottom: '2rem'}}>
          <WasteFractionInfoBox
            wasteFraction={name}
            bins={bins}
            pickup={pickup}
            avgerageWithOneDecimal={avgerageWithOneDecimal}>

          </WasteFractionInfoBox>
          </div>

          <Card className="card-wrapper">
            <Card.Body className="card-body">
                <h5 style={{margin: '1rem 0rem 0rem 1rem' }}>Choose a date interval</h5>
                <div className='filter_options_wrapper' style={{ }}>
                    <DateRange dateRange={dateRange} onDateChange={setDateRange} Chrome={isChrome}/>
                </div>
                <div className="graph_wrapper_inner" style={{ backgroundColor: 'white',}}>
                    <Graph graphData={graphData} visibleFractions={visibleFractions} />
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
