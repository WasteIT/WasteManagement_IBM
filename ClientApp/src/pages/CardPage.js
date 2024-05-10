import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import WasteCard from '../components/WasteCard';
import UserContext from '../utils/UserContext';

export default function CardPage() {
    const location = useLocation();
    const [name, ] = useState(location.state.name);
    const [cards, setCards] = useState([]);
    const [avgPickup, setAvgPickup] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const { setUserName } = useContext(UserContext);
    

    useEffect(() => {
      if (name) {
          setUserName(name); 
      }
    }, [name, setUserName]);


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
                <WasteCard key={index} streetname={name} name={cardType} bins={cards[cardType]} pickup={schedules[cardType]} avg={avgPickup[cardType]}/>
              ))}
            </div>
 
          </div>
          <Link to="/Report" className="fixed-square" state={{ name: name }}>Your Report is Ready</Link>
        </main>
    );
}