import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import WasteCard from '../components/WasteCard';
import UserContext from '../utils/UserContext';

export default function CardPage() {
    const location = useLocation();
    const [name, ] = useState(location.state.name);
    const [cards, setCards] = useState([]);
    const [avgPickup, setAvgPickup] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setStreetName } = useContext(UserContext);
    

    useEffect(() => {
      if (name) {
        setStreetName(name); 
      }
    }, [name, setStreetName]);


    useEffect(() => {
        const fetchSensorData = async () => {
          try {
            const response = await fetch("https://wasteit-backend.azurewebsites.net/data/" + name + "/sensor");
            if (!response.ok) {
              throw new Error('Failed to fetch sensor data');
            }

            const childrenData = await response.json();
            setCards(childrenData);
          } catch (error) {
            console.error('Error fetching sensor data:', error);
          }
        };
        fetchSensorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    useEffect(() => {
      
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      const fetchAvgPickupAndSchedules = async () => {
        try {
          const response = await fetch("https://wasteit-backend.azurewebsites.net/sensorData/" + name);
          if (!response.ok) {
            throw new Error('Failed to fetch sensor data');
          }
          const avgPickupAndSchedules = await response.json();
          setAvgPickup(avgPickupAndSchedules.AverageFillLevels)
          setSchedules(avgPickupAndSchedules.PickupSchedules)
        } catch (error) {
          console.error('Error fetching sensor data:', error);
        }
      };
      fetchAvgPickupAndSchedules();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  if (isLoading) {
    return (
      <main className='main'>
        <div className='cardpage_title_div flex-row'>
          <div className='cardpageIcon'>
            <div style={{ borderRadius: '10px', background: 'lightgrey', color: 'lightgrey', width: 70, height: 70, margin: '4px 8px' }} />
          </div>
          <div>
            <h2 className='cardpage_location_title' style={{ width: 150, height: 22.5, borderRadius: '10px', background: 'lightgrey', color: 'lightgrey', marginBottom: '15px', marginTop: '15px', fontSize: '26px' }}> </h2>
            <h2 className='WasteFractionOverview' style={{ width: 200, height: 22.5, borderRadius: '10px', background: 'lightgrey', color: 'lightgrey', fontSize: '26px' }}> </h2>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='card_container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '15px', marginLeft: '25px' }}>
          {Object.keys(cards).map((cardType, index) => (
            <div key={index} className="placeholder-card" style={{ borderRadius: '10px', background: 'lightgrey', color: 'lightgrey', width: 292, height: 346, margin: '0 10px 20px', flex: '0 1 calc(25% - 20px)' }} />
          ))}
        </div>
        </div>
      </main>
    )
  }
  
  
  
  
  
  
  
    return (
        <main className='main'>
          <div className='cardpage_title_div flex-row' >
            <img className='cardpageIcon' src={`./images/cardpageIcon.png`} alt='Waste fraction icon'/>
            <span>
            <h2 className='cardpage_location_title'> {name}</h2>
            <h2 className='WasteFractionOverview'> Waste Fraction Overview </h2>
            </span>
          </div>
          <div style={{justifyContent: 'center', display: 'flex'}}>
            <div className="card_container" >
              {Object.keys(cards).map((cardType, index) => (
                <WasteCard key={index} streetName={name} name={cardType} bins={cards[cardType]} pickup={schedules[cardType]} avg={avgPickup[cardType]}/>
              ))}
              </div>
 
            </div>
        </main>
    );
}