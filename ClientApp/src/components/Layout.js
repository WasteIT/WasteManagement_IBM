import React, { Component } from 'react';
import Graph from './Graph';
import Form from 'react-bootstrap/Form';

export default class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <main>
        <div className="information_page">
          <Form className="fraction_filter">
            <Form.Check type="checkbox" id="fraction_1" label="Rest" checked/>
            <Form.Check type="checkbox" id="fraction_1" label="Plastic" checked/>
            <Form.Check type="checkbox" id="fraction_1" label="Cardboard" checked/>
            <Form.Check type="checkbox" id="fraction_1" label="Other"/>
            <Form.Check type="checkbox" id="fraction_1" label="Other"/>
          </Form>
          <div className='graph_wrapper_outer'>
            <div className='filter_options_wrapper'>
              <h3>Filter options:</h3>
              <button type='button' className='btn button filter_graph_button'>Past week</button>
              <button type='button' className='btn button filter_graph_button'>Past month</button>
              <button type='button' className='btn button filter_graph_button'>Custom filter</button>
            </div>
            <div className='graph_wrapper_inner'>
              <Graph />
            </div>
          </div>
        </div>
      </main>
    );
  }
}
