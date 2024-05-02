import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

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
                        <Link className="btn button agreement" to="/Overview"  state={{ name: name }}>Access waste data</Link>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }
}

export default ServiceAgreementsDropdown;
