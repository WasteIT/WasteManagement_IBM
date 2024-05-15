import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sortWeekdays } from '../utils/SortDays'

/**
 * WasteCard is a functional component representing a card displaying information about a specific waste type.
 * It includes details such as the waste type name, average fill level at pickup, pickup days, and the number of bins.
 * Clicking on the card navigates to the '/graph' route with relevant state data.
 * 
 * @param {string} name - The name of the waste type.
 * @param {string} streetName - The name of the street associated with the waste type.
 * @param {string[]} pickup - An array of pickup days for the waste type.
 * @param {string[]} bins - An array of bin IDs associated with the waste type.
 * @param {number} avg - The average fill level at pickup for the waste type.
 * @returns {JSX.Element|null} - The JSX element representing the waste card, or null if pickup data is unavailable.
 */

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
          <span className="pickup_value">{pickup.length > 0 ? sortWeekdays(pickup).join(", ") : "By appointment"} </span>
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
