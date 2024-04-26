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
      <Card style={{
        width: '18rem',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        border: 'none',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '1rem'
      }}
      onClick={() => console.log("user clicked")}>
        <Card.Img variant="top" src={`./images/${name}.png`} style={{
          width: '9rem',
          margin: '0.5rem auto',
          display: 'block'
        }}/>
        <ListGroup variant="flush">
          <ListGroup.Item style={{ padding: '0.75rem 1.25rem' }}>Avg fill level at pickup: {avgerageWithOneDecimal}%</ListGroup.Item>
          <ListGroup.Item style={{ padding: '0.75rem 1.25rem' }}>Pickup: {pickup.length > 0 ? pickup.join(", ") : "No pickups"}</ListGroup.Item>
          <ListGroup.Item style={{ padding: '0.75rem 1.25rem' }}>Bins: {bins}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Link>
  );
}
