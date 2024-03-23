import React, { Component } from 'react';
import Graph from './Graph';
import Form from 'react-bootstrap/Form';

export default class Layout extends Component {
  static displayName = Layout.name;


  constructor(props) {
    super(props);
    this.state = {
      sensorVisibility: {
        'Bin 1': true,
        'Bin 2': true,
        'Bin 3': true,
        'Bin 4': true,
        'Bin 5': true
      }
    };
  }

  toggleSensorVisibility(label) {
    this.setState(prevState => ({
      sensorVisibility: {
        ...prevState.sensorVisibility,
        [label]: !prevState.sensorVisibility[label]
      }
    }));
  }


  render() {
    return (
      <main>
        <div className="information_page">
          <Form className="fraction_filter">
          <Form.Check
              type="checkbox"
              id="Bin 1"
              label="Bin 1"
              checked={this.state.sensorVisibility['Bin 1']}
              onChange={() => this.toggleSensorVisibility('Bin 1')}
            />
            <Form.Check
              type="checkbox"
              id="Bin 2"
              label="Bin 2"
              checked={this.state.sensorVisibility['Bin 2']}
              onChange={() => this.toggleSensorVisibility('Bin 2')}
            />
            <Form.Check
              type="checkbox"
              id="Bin 3"
              label="Bin 3"
              checked={this.state.sensorVisibility['Bin 3']}
              onChange={() => this.toggleSensorVisibility('Bin 3')}
            />
            <Form.Check
              type="checkbox"
              id="Bin 4"
              label="Bin 4"
              checked={this.state.sensorVisibility['Bin 4']}
              onChange={() => this.toggleSensorVisibility('Bin 4')}
            />
            <Form.Check
              type="checkbox"
              id="Bin 5"
              label="Bin 5"
              checked={this.state.sensorVisibility['Bin 5']}
              onChange={() => this.toggleSensorVisibility('Bin 5')}
            />
          </Form>
          <div className='graph_wrapper_outer'>
            <div className='filter_options_wrapper'>
              <h3>Filter options:</h3>
              <button type='button' className='btn button filter_graph_button'>Past week</button>
              <button type='button' className='btn button filter_graph_button'>Past month</button>
              <button type='button' className='btn button filter_graph_button'>Custom filter</button>
            </div>
            <div className='graph_wrapper_inner'>
            <Graph sensorVisibility={this.state.sensorVisibility} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}
