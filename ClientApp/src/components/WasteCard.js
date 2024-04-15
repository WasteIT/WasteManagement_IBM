import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function WasteCard(name) {
  return (
    <Link to='/graph' style={{textDecoration: 'none'}} state={{ name: name.streetname, pickup: name.pickup, bins: name.bins }}>
        <Card style={{
        width: '18rem',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // This will give the 3D effect
        border: 'none', // This removes the border
        borderRadius: '10px', // Optional: if you want rounded corners
        overflow: 'hidden', // Ensures the image doesn't break the border radius
        marginBottom: '1rem' // Adds some space below the card
        }}
        onClick={() => console.log("user")}>
        <Card.Img variant="top" src={`./images/${name.name}.png`} style={{
            width: '9rem',
            margin: '0.5rem auto', // Centers the image and adds whitespace above and below
            display: 'block' // Ensures the image doesn't take full width and respects the margin auto
        }}/>
        <ListGroup variant="flush">
            <ListGroup.Item style={{ padding: '0.75rem 1.25rem' }}>Avg fill level at pickup: {Math.round(name.avg*10)/10}%</ListGroup.Item>
            <ListGroup.Item style={{ padding: '0.75rem 1.25rem' }}>Pickup: {name.pickup.join(", ")}</ListGroup.Item>
            <ListGroup.Item style={{ padding: '0.75rem 1.25rem' }}>Bins: {name.bins}</ListGroup.Item>
        </ListGroup>
        </Card>
    </Link>
  );
}
