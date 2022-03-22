import React, { Component } from 'react';
import axios from 'axios';

import './screen_properties.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class ScreenProperties extends Component {
  constructor(props) {
    super(props);

    this.onChangeFloors = this.onChangeFloors.bind(this);

    this.state = {
      floors: '',
      foundationPiles: '',
      foundationBeams: '',
    }
  }

  onChangeFloors(e) {
    this.setState({
      floors: e.target.value,
      foundationPiles: Math.round(this.props.buildingInfo.surface / this.state.floors / 9),
      foundationBeams: Math.round(this.props.buildingInfo.surface / this.state.floors / 6)
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
          <div className='row padding-top-2'>
            <div className='col'>
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
            <label>Verdiepingen</label>
                <input type="text" value={this.state.floors} onChange={this.onChangeFloors} name="input-floors" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
            <label>Fundering palen</label>
                <input type="text" value={this.state.foundationPiles} name="input-foundationPiles" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
            <label>Fundering balken</label>
                <input type="text" value={this.state.foundationBeams} name="input-foundationBeams" className="form-control"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}