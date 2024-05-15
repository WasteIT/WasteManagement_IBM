import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

/**
 * ServiceAgreementsDropdown is a class component in React that represents a dropdown item displaying details of a service agreement.
 * 
 * @param {object} props - Props passed to the ServiceAgreementsDropdown component.
 * @param {string} props.name - The name of the service agreement to be displayed.
 * 
 * @returns {JSX.Element} JSX element representing the ServiceAgreementsDropdown component.
 */

class ServiceAgreementsDropdown extends Component {
    render() {
        const { name } = this.props;

        return (
            <Accordion className="agreementAccordion dropdown" defaultActiveKey="1">
                <Accordion.Item className="agreement" eventKey="0">
                    <Accordion.Header className="agreementAccordionButton">
                        Agreement: {name}
                    </Accordion.Header> 
                    <Accordion.Body className="agreement-Accordion-body">
                        <p>Details of the Agreement for {name}</p>
                        <div style={{display: 'flex', justifyContent: 'right'}}>
                            <Link className="btn button agreement" to="/Overview" state={{ name: name }}>Access waste data</Link>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }
}

export default ServiceAgreementsDropdown;
