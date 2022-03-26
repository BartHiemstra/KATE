import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import axios from 'axios';

import './screen_properties.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class ScreenProperties extends Component {
  constructor(props) {
    super(props);

    this.onChangeFloors = this.onChangeFloors.bind(this);
    this.onChangeFoundationType = this.onChangeFoundationType.bind(this);

    this.state = {
      floors: '',
      foundationType: '',
      foundationPiles: '',
      foundationBeams: '',
    }
  }

  onChangeFloors(e) {
    this.setState({
      floors: e.target.value,
      //TODO: External class for formulas like these ('BuildingRules').
      foundationPiles: Math.round(this.props.buildingInfo.surface / this.state.floors / 9),
      foundationBeams: Math.round(this.props.buildingInfo.surface / this.state.floors / 6)
    })
  }

  onChangeFoundationType(e) {
    this.setState({
      foundationType: e.target.value,
    })
  }

  onChangeFoundationPiles(e) {
    this.setState({
      foundationPiles: e.target.value,
    })
  }

  onChangeFoundationBeams(e) {
    this.setState({
      foundationBeams: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <div className='container vh-100'>
          <div className='row padding-top-2 text-center'>
            <h2>{this.props.buildingInfo.street} {this.props.buildingInfo.number}</h2>
            <h5>{this.props.buildingInfo.postal}, {this.props.buildingInfo.city}</h5>
          </div>
          <div className='row padding-top-3'>
            <div className='col'>
            <h4>Algemene gegevens</h4>
            <label>Bouwjaar</label>
                <input readOnly type="text" value={this.props.buildingInfo.year} name="input-year" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
            <label>Gebruiksoppervlakte (GBO)</label>
                <input readOnly type="text" value={this.props.buildingInfo.surface + ' m2'} name="input-surface" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
            <label>Aantal verdiepingen</label>
                <input autoFocus type="text" value={this.state.floors} onChange={this.onChangeFloors} name="input-floors" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-3'>
            <div className='col'>
              <h4>Fundering</h4>
              <label>Type</label>
              <select onChange={this.onChangeFoundationType} className="form-control custom-select" name="input-foundationType">
                <option value='Fundering op staal'>Fundering 'op staal'</option>
                <option value='Fundering op betonpalen'>Betonpalen</option>
                <option value='Fundering op houten palen'>Houten palen</option>
              </select>
            </div>
          </div>
          {this.state.foundationType.includes('palen') &&
          <Fade>
            <div className='row padding-top-1'>
              <div className='col'>
                <label>Aantal palen</label>
                <input type="text" onChange={this.onChangeFoundationPiles} value={this.state.foundationPiles} name="input-foundationPiles" className="form-control"/>
              </div>
            </div>
          </Fade>
          }
          {this.state.foundationType.includes('palen') &&
          <Fade>
            <div className='row padding-top-1'>
              <div className='col'>
                <label>Aantal balken</label>
                <input type="text" onChange={this.onChangeFoundationBeams} value={this.state.foundationBeams} name="input-foundationBeams" className="form-control"/>
              </div>
            </div>
          </Fade>
          }
          <div className='row padding-top-3'>
            <div className='col'>
              <h4>Hoofddraagconstructie</h4>
              <label>Type</label>
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-supportType">
                <option value='Staal'>Staal</option>
                <option value='Beton'>Beton</option>
                <option value='Hout'>Hout</option>
              </select>
            </div>
          </div>
          <div className='padding-bottom-1'></div>
        </div>
      </div>
    )
  }
}