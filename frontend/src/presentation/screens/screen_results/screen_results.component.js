import React, { Component } from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import axios from 'axios';

import './screen_results.css';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export default class ScreenProperties extends Component {
  constructor(props) {
    super(props);
    
    this.format = this.format.bind(this);
    this.onReturn = this.onReturn.bind(this);
    this.pushAPI = this.pushAPI.bind(this);
  }

  onReturn() {
    this.props.showComponent('Properties')
  }

  
  //Testing API
  pushAPI() {
    const material = {
      name: 'Hout',
      componentName: 'Hoofddraagconstructie',
      labelName: 'type',
      unitType: 'm3',
      pricePerUnit: 5.50
    }

    axios.get(API_BASE_URL + 'materials/add', material)
      .then(result => console.log(result.data));
  }
  

  // Format the input value to a more readable version.
  format(value) {
    //Round to 2 decimals.
    var formattedValue = parseFloat(value).toFixed(2);
    
    //Swap dot with comma for decimals.
    formattedValue = formattedValue.replace('.', ',')
    
    //Add '.' for every 3 numbers before the decimal.
    formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return formattedValue;
  }

  render() {
    console.log(this.props.residualValue);
    const data = Array.from(this.props.residualValue);
    console.log(data);
    return (
      <div>
        <div className='container vh-100'>
          <div className='row padding-top-3 text-center'>
            <h2>{this.props.buildingInfo.street} {this.props.buildingInfo.number}</h2>
            <h5>{this.props.buildingInfo.postal}, {this.props.buildingInfo.city}</h5>
          </div>
          <div className='row padding-top-3'>
            <div className='card'>
                <label id='label-residualValue' className='padding-top-1'>Restwaarde: <b>€ {this.format(1)}</b></label>
            </div>
          </div>
          <div className='row padding-top-3'>
            <h6>De gegeven materiële restwaarde voor dit pand is opgebouwd uit de volgende elementen:</h6>
            {data.map(item => (
              <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                <Accordion.Header>item.name</Accordion.Header>
                <Accordion.Body>
                  <Table responsive style={{ whiteSpace: 'nowrap' }}>
                    <thead>
                      <tr>
                        <th>Onderdeel</th>
                        <th>Materiaal</th>
                        <th>Totaal</th>
                        <th>Restwaarde</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{ item.name}</td>
                        <td>{ item.material }</td>
                        <td>{ item.total }</td>
                        <td>€ {this.format(item.value)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>       
              </Accordion>
            ))}
          </div>
          <div className='row padding-top-2'>
            <div className='col'>
              <Button variant="outline-primary" onClick={this.onReturn}>Vorige</Button>
              <Button variant="primary" onClick={this.pushAPI}>Opslaan als PDF</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}