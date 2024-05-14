import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sortWeekdays } from '../utils/SortDays'

export default function WasteCard({ name, streetName, pickup, bins, avg }) {

  if (!pickup) {
    return null;
  }
  
  const avgerageWithOneDecimal = Math.round(avg * 10) / 10
  return (
    <Link to='/graph' style={{ textDecoration: 'none' }} state={{ streetName, name, pickup, bins, avgerageWithOneDecimal }}>
      <Card className= {`wastetype ${name}`}>
        <Card.Img variant="top" src={`./images/${name}.png`} />
        <ListGroup variant="flush">
          <ListGroup.Item className= {`avg_fill ${name}`}>
          <span className="avg_pickup_text flex-column">Avg fill level at pickup:</span> 
          <span className="avg_pickup_value"> {avgerageWithOneDecimal}% </span>
          </ListGroup.Item>
          <ListGroup.Item className= {`pickup ${name}`}>
          <span className="pickup_text flex-column"> Pickup days: </span>
          <span className="pickup_value">{pickup.length > 0 ? sortWeekdays(pickup).join(", ") : "No pickups"} </span>
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
