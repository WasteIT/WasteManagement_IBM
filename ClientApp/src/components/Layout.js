import React, { Component } from 'react';
import Graph from './Graph';

export default class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Left section */}
        <div style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
          <ul>
            <li>Menu item 1</li>
            <li>Menu item 2</li>
            <li>Menu item 3</li>
            <li>Menu item 4</li>
          </ul>
        </div>
        {/* Middle section */}
        <div style={{ flex: 2, backgroundColor: '#ffffff', textAlign: 'center' }}>
          <h3>Filter options</h3>
          <div style={{ marginBottom: '20px' }}>
            <button style={{ marginRight: '10px' }}>Past week</button>
            <button style={{ marginRight: '10px' }}>Past month</button>
            <button>Custom filter</button>
            <Graph />
          </div>
        </div>
        {/* Right section */}
        <div style={{ flex: 1, backgroundColor: '#f5f5F5' }}>
          {/* make checkboxes one text and a checkbox on each line*/}
          <input type="checkbox" id="fraction1" />
          <label htmlFor="fraction1"> fraction one</label><br/>
          <input type="checkbox" id="fraction2" />
          <label htmlFor="fraction2"> fraction two</label><br/>
          <input type="checkbox" id="fraction3" />
          <label htmlFor="fraction3"> fraction three</label><br/>
        </div>
      </div>
    );
  }
}
