import React, { Component } from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import { withTranslation } from 'react-i18next'

import { formatMetricTon, formatEuros } from '../../../business/format.js';
import { exportPDF } from '../../../business/export.js';

import LanguageSelector from '../../header/language_selector.component';

import './screen_results.css';

class ScreenResults extends Component {
  constructor(props) {
    super(props);
    
    this.export = this.export.bind(this);
    this.onReturn = this.onReturn.bind(this);
  }

  onReturn() {
    this.props.showComponent('Properties')
  }

  // Call export function from business, using table data, a table name and the address as filename.
  export(data) {
    // Locale data.
    const { t } = this.props;

    // Table data.
    let tableName = this.props.buildingInfo.street + ' ' + this.props.buildingInfo.number + ', ' + this.props.buildingInfo.postal + ' ' + this.props.buildingInfo.city;
    let fileName = this.props.buildingInfo.street + ' ' + this.props.buildingInfo.number;
    let residualValueArray = Array.from(this.props.residualValue)
    let totalResidualValue = residualValueArray[residualValueArray.length - 1].value;

    exportPDF(t, totalResidualValue, data, tableName, fileName);
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
    
    return (
      <div>
        <div className='container vh-100'>
          <div className='row padding-top-1'><LanguageSelector></LanguageSelector></div>
          <div className='row padding-top-3 text-center'>
            <h2>{this.props.buildingInfo.street} {this.props.buildingInfo.number}</h2>
            <h5>{this.props.buildingInfo.postal}, {this.props.buildingInfo.city}</h5>
          </div>
          <div className='row padding-top-3'>
            <div className='card'>
                <h4 id='label-residualValue' className='padding-top-1'>{t('label_residualvalue')} <b>€ {formatEuros(totalResidualValue, 10000)}</b></h4>
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
                        <th>{t('table_residualvalueRounded')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{ item.material }</td>
                        <td>{ formatMetricTon(item.total) } {t('metric_ton')}</td>
                        <td>€ {formatEuros(item.value, 0)}</td>
                        <td>€ {formatEuros(item.value, 1000)}</td>
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
              <Button variant="primary" onClick={() => { this.export(data) } }>{t('button_export')}</Button>
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