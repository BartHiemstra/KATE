import React, { Component } from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import { withTranslation } from 'react-i18next'

import './screen_results.css';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class ScreenResults extends Component {
  constructor(props) {
    super(props);
    
    this.format = this.format.bind(this);
    this.onReturn = this.onReturn.bind(this);
  }

  onReturn() {
    this.props.showComponent('Properties')
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
    // Retrieve i18n translation data.
    const { t } = this.props;

    // Convert residual value data to array.
    let data = Array.from(this.props.residualValue);

    // Get the total residual value from the last entry in the data array.
    let totalResidualValue = data[data.length - 1].value;
    
    // Then remove that last entry so it doesn't get displayed when iterating through the array for table display.
    data.pop();
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
                <h4 id='label-residualValue' className='padding-top-1'>{t('label_residualvalue')} <b>€ {this.format(totalResidualValue)}</b></h4>
            </div>
          </div>
          <div className='row padding-top-3'>
            <h6>{t('table_descriptor')}</h6>
            {data.map(item => (
              <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                <Accordion.Header> {t(item.name)} </Accordion.Header>
                <Accordion.Body>
                  <Table responsive style={{ whiteSpace: 'nowrap' }}>
                    <thead>
                      <tr>
                        <th>{t('table_material')}</th>
                        <th>{t('table_mass')}</th>
                        <th>{t('table_residualvalue')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{ item.material }</td>
                        <td>{ Math.round(item.total) } {t('metric_ton')}</td>
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
              <Button variant="outline-primary" onClick={this.onReturn}>{t('button_back')}</Button>
              <Button variant="primary" onClick={console.log('hi')}>{t('button_export')}</Button>
            </div>
          </div>
          <div className='padding-bottom-2'></div>
        </div>
      </div>
    )
  }
}

// Export with i18n translation.
export default withTranslation()(ScreenResults);