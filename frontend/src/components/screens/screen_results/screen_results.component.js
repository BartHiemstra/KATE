import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Fade from 'react-reveal/Fade';

import './screen_results.css';

export default class ScreenProperties extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div className='container vh-100'>
          <div className='row padding-top-2 text-center'>
            <h2>Berekende restwaarde</h2>
            <div className='padding-top-1'></div>
            <h5>{this.props.buildingInfo.street} {this.props.buildingInfo.number}</h5>
            <h6>{this.props.buildingInfo.postal}, {this.props.buildingInfo.city}, {this.props.buildingInfo.province}</h6>
          </div>
          <div className='row padding-top-3'>
            <h6>De berekende restwaarde is opgebouwd uit de volgende elementen:</h6>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Fundering</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Hoofdconstructie</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }
}