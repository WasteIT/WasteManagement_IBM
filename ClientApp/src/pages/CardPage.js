import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import WasteCard from '../components/WasteCard';

export default function CardPage() {
    const location = useLocation();
    const [name, setName] = useState(location.state.name);
    const [cards, setCards] = useState([]);
    


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
     
    return (
        <main>
            {cards.map(name => (  
                <WasteCard name={name}/>
            ))}  
        </main>
    );
}