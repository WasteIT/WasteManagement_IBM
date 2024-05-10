import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function WasteCard({ name, streetname, pickup, bins, avg }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (!pickup) {
    return null;
  }
  
  const avgerageWithOneDecimal = Math.round(avg * 10) / 10
  return (
    /* skal reguleres, men lm da ej virker */
    isLoading ? (
      <main className='main'>
      <div className='waste-fraction-info-box-wrapper' style={{display: 'flex'}}>
      <div style={{borderRadius: '30px', background: 'lightgrey', color: 'lightgrey', width: 272, height: 255, marginLeft: 60}}/>
       <div style={{borderRadius: '30px', background: 'lightgrey', color: 'lightgrey', width: 1020, height: 255, marginLeft: 30}}/>
      </div>
      </main>   
    ) : 
    <Link to='/graph' style={{ textDecoration: 'none' }} state={{ streetname, name, pickup, bins, avgerageWithOneDecimal }}>
      <Card className= {`wastetype ${name}`}>
        <Card.Img variant="top" src={`./images/${name}.png`} />
        <ListGroup variant="flush">
          <ListGroup.Item className= {`avg_fill ${name}`}>
          <span className="avg_pickup_text flex-column">Avg fill level at pickup:</span> 
          <span className="avg_pickup_value"> {avgerageWithOneDecimal}% </span>
          </ListGroup.Item>
          <ListGroup.Item className= {`pickup ${name}`}>
          <span className="pickup_text flex-column"> Pickup days: </span>
          <span className="pickup_value">{pickup.length > 0 ? pickup.join(", ") : "No pickups"} </span>
          </ListGroup.Item>
          <ListGroup.Item className= {`bins ${name}`}>
            <span className="bins_text">Bins: </span>
            <span className="bins_value">{bins.length} </span>
            </ListGroup.Item>
        </ListGroup>
      </Card>
    </Link>
  );
}
