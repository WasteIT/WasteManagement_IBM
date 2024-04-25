import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WasteCard from '../components/WasteCard';
import '@fontsource/roboto';
import './/CardPage.css'

export default function CardPage() {
    const location = useLocation();
    const [name, ] = useState(location.state.name);
    const [cards, setCards] = useState([]);
    const [avgPickup, setAvgPickup] = useState([]);
    const [schedules, setSchedules] = useState([]);
    
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
        <main className='main' style={{ marginTop: '1rem', width: '90%'}}>
          <div className='cardpage_title_div'>
            <img className='cardpageIcon' src={`./images/cardpageIcon.png`}/>
            <h2 className='cardpage_location_title'> {name}</h2>
            <br/>
            <h2 className='WasteFractionOverview'> Waste Fraction Overview </h2>
          </div>
            <div className="card_container">
              {Object.keys(cards).map((cardType, index) => (
                <WasteCard key={index} streetname={name} name={cardType} bins={cards[cardType].length} pickup={schedules[cardType]} avg={avgPickup[cardType]}/>
              ))}
 
            </div>
        </main>
    );
}