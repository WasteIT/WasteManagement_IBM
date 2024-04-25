import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'chartjs-adapter-date-fns';
import { DateRange } from './DateRange'
import { SensorControls, fetchSensorControlsData } from './SensorControls'
import Graph, { fetchAllGraphData, fetchSingleGraphData } from './Graph';
import './Layout.css';
import './../../style.css';
import Card from 'react-bootstrap/Card';

const Layout = () => {
  
    const { state: { name, pickup, bins, avgerageWithOneDecimal} = {} } = useLocation();
    const [sensorData, setSensorData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [graphData, setGraphData] = useState({});
    const [dateRange, setDateRange] = useState({
      startDate: new Date(new Date().setDate(new Date().getDate()-31)),
      endDate: new Date(new Date().setDate(new Date().getDate())),
    });

    useEffect(() => {
      const fetchData = async () => {
        await fetchSensorControlsData(name, setSensorData);
      };  
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        await fetchAllGraphData(name, sensorData, dateRange, setGraphData, setIsLoading);
      };  
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, sensorData, dateRange]);
    
    const handleSensorSelect = async (wasteType, sensor) => {
      await fetchSingleGraphData(name, wasteType, sensor, graphData, dateRange, setIsLoading);
  };
    

  return (
    <main>
      <h2 style={{ textAlign: 'center', paddingTop: '20px'}}>{name}</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="information_page">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SensorControls
              sensorData={sensorData}
              graphData={graphData}
              onSensorSelect={handleSensorSelect}
              setGraphData={setGraphData}
            />
          </div>
          <Card className="card-wrapper"> {/* Add className */}
                        <Card.Body className="card-body"> {/* Add className */}
                            <div className='filter_options_wrapper'>
                                <DateRange dateRange={dateRange} onDateChange={setDateRange} />
                            </div>
                            <div className="graph_wrapper_inner">
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
      )}
    </main>
  );
};

export default Layout;
