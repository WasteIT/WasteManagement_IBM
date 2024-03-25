import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

class ServiceAgreementsDropdown extends Component {
    render() {
        const { name } = this.props;
        return (
            <Accordion className="dropdown" defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{name}</Accordion.Header>
                    <Accordion.Body>
                        <p>Content for {name}</p>
                        <Link className="btn button" to="/graph"  state={{ name: name }}>Agreements</Link>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }
}

export default ServiceAgreementsDropdown;
