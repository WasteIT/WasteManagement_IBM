import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function WasteCard({ name, streetname, pickup, bins, avg }) {
  if (!pickup) {
    
    return null;
  }
  const avgerageWithOneDecimal = Math.round(avg * 10) / 10
  return (
    <Link to='/graph' style={{ textDecoration: 'none' }} state={{ name: streetname, pickup, bins, avgerageWithOneDecimal }}>
      <Card
      className= {`wastetype ${name}`}
     
      
      onClick={() => console.log("user clicked")}>
        <Card.Img variant="top" src={`./images/${name}.png`} style={{
          width: '9rem',
          margin: '0.5rem auto',
          display: 'block'
        }}/>
        <ListGroup variant="flush">
          <ListGroup.Item className= {`avg_fill ${name}`}>
          <span className="avg_pickup_text">Avg fill level at pickup:</span> 
          <span className="avg_pickup_value"> {avgerageWithOneDecimal}% </span>
          </ListGroup.Item>
          <ListGroup.Item className= {`pickup ${name}`}>
          <span className="pickup_text"> Pickup days: </span>
          <span className="pickup_value">{pickup.length > 0 ? pickup.join(", ") : "No pickups"} </span>
          </ListGroup.Item>
          <ListGroup.Item className= {`bins ${name}`}>
            <span className="bins_text">Bins: </span>
            <span className="bins_value">{bins} </span>
            </ListGroup.Item>
        </ListGroup>
      </Card>
    </Link>
  );
}
