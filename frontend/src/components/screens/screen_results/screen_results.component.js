import React, { Component } from 'react';
import { Accordion, Table } from 'react-bootstrap';
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
            <h2>Materiële restwaarde</h2>
            <div className='padding-top-1'></div>
            <h5>{this.props.buildingInfo.street} {this.props.buildingInfo.number}</h5>
            <h6>{this.props.buildingInfo.postal}, {this.props.buildingInfo.city}, {this.props.buildingInfo.province}</h6>
          </div>
          <div className='row padding-top-3'>
            <h6>De gegeven materiële restwaarde voor dit pand is opgebouwd uit de volgende elementen:</h6>
            <Accordion alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Fundering</Accordion.Header>
                <Accordion.Body>
                <Table responsive style={{ whiteSpace: 'nowrap' }}>
                  <thead>
                    <tr>
                      <th>Onderdeel</th>
                      <th>Materiaal</th>
                      <th>Aantal</th>
                      <th>Totaal</th>
                      <th>Restwaarde</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Palen</td>
                      <td>Beton</td>
                      <td>22</td>
                      <td>350 m3</td>
                      <td >€ 400,50</td>
                    </tr>
                    <tr>
                      <td>Balken</td>
                      <td>Beton</td>
                      <td>25</td>
                      <td>250 m3</td>
                      <td>€ 400,50</td>
                  </tr>
                  <tr>
                      <td><b>Totaal</b></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><b>€ 801,30</b></td>
                  </tr>
                </tbody>
              </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Hoofdconstructie</Accordion.Header>
                <Accordion.Body>
                    -
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }
}