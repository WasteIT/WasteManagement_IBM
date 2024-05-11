import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'chartjs-adapter-date-fns';
import { DateRange } from './DateRange'
import { SensorControls, fetchSensorControlsData } from './SensorControls'
import WasteFractionInfoBox from './WasteFractionInfoBox'
import Graph, { fetchAllGraphData, fetchSingleGraphData } from './Graph';
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

  
  if(isLoading){
    return(
      <main className='main'>
        <div className='waste-fraction-info-box-wrapper' style={{display: 'flex', width: '100vw'}}>
        <div style={{borderRadius: '30px', background: 'lightgrey', color: 'lightgrey', width: 272, height: 255, marginTop: '-15px', marginRight: '34px', padding: '1rem'}}/>
         <div style={{borderRadius: '30px', background: 'lightgrey', color: 'lightgrey', width: 1020, height: 255, marginTop: '-15px', marginRight: '0px'}}/>
        </div>

        <div className='waste-fraction-info-box-wrapper' style={{display: 'flex', width: '100vw'}}>
        <div style={{borderRadius: '30px', background: 'lightgrey', color: 'lightgrey', width: 272, height: 528, marginRight: '34px', padding: '1rem'}}/>
         <div style={{borderRadius: '30px', background: 'lightgrey', color: 'lightgrey', width: 1020, height: 668, marginRight: '0px'}}/>
        </div>
      </main>
  )
}

  return (
    <main className='waste-bin-overview-page-wrapper-outer'> 
      <div className='waste-bin-overview-page-wrapper-inner'>
          <div className="information_page_wrapper_outer flex-row">
            <div className='flex-column information_page_wrapper_inner'>
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
              <div className='waste-fraction-info-box-wrapper'>
                <WasteFractionInfoBox
                  wasteFraction={name}
                  bins={bins}
                  pickup={pickup}
                  avgerageWithOneDecimal={avgerageWithOneDecimal} />
              </div>

              <Card className="card-wrapper">
                <Card.Body className="card-body" style={{paddingBottom: '4rem'}}>
                  <h5 className='date-range-picker-title'>Choose a date interval</h5>
                  <div className='filter_options_wrapper'>
                    <DateRange dateRange={dateRange} onDateChange={setDateRange} Chrome={isChrome}/>
                  </div>
                  <div className="graph_wrapper_inner">
                    <Graph graphData={graphData} visibleFractions={visibleFractions} />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>    
      </div>
      <Link to="/Report" className="fixed-square" state={{ name: streetname }}>Optimization</Link>
    </main>
  );
};

export default Layout;
