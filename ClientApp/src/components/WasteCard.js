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
          <ListGroup.Item className= {`avg_fill_${name}`} 
          style={{ padding: '0.75rem 1.25rem' }}>Avg fill level at pickup: {avgerageWithOneDecimal}%</ListGroup.Item>
          <ListGroup.Item className= {`pickup_${name}`}
          style={{ padding: '0.75rem 1.25rem' }}>Pickup: {pickup.length > 0 ? pickup.join(", ") : "No pickups"}</ListGroup.Item>
          <ListGroup.Item className= {`bins_${name}`}
          style={{ padding: '0.75rem 1.25rem' }}>Bins: {bins}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Link>
  );
}
