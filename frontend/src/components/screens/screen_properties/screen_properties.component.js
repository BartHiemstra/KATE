import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import axios from 'axios';

import image from '../../../assets/images/icon_info.png';
import InfoModal from '../../modal/info_modal.component';
import './screen_properties.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class ScreenProperties extends Component {
  constructor(props) {
    super(props);

    this.onChangeFloors = this.onChangeFloors.bind(this);
    this.onChangeFloorHeight = this.onChangeFloorHeight.bind(this);
    this.onChangeFoundationType = this.onChangeFoundationType.bind(this);
    this.onShowInfoModal = this.onShowInfoModal.bind(this);
    this.onCloseInfoModel = this.onCloseInfoModel.bind(this);

    this.state = {
      showModal: false,
      floors: '',
      floorHeight: '3.5',
      foundationType: '',
      foundationPiles: '',
      foundationBeams: '',
    }
  }

  onChangeFloors(e) {
    const floors = e.target.value;
    if(floors < 0 || floors > 99) {
      floors = 0;
    }
    this.setState({
      floors: floors,
      //TODO: External class for formulas like these ('BuildingRules').
      foundationPiles: Math.round(this.props.buildingInfo.surface / this.state.floors / 9),
      foundationBeams: Math.round(this.props.buildingInfo.surface / this.state.floors / 6)
    })
  }

  onChangeFloorHeight(e) {
    this.setState({
      floorHeight: e.target.value,
    })
  }

  onChangeFoundationType(e) {
    this.setState({
      foundationType: e.target.value,
    })
  }

  onChangeFoundationPiles(e) {
    if(typeof(e) != "undefined") {
      this.setState({
        foundationPiles: e.target.value,
      })
    }
  }

  onChangeFoundationBeams(e) {
    if(typeof(e) != "undefined") {
      this.setState({
        foundationBeams: e.target.value,
      })
    }
  }

  onShowInfoModal() {
    this.setState({
      showModal: true
    })
  }

  onCloseInfoModel() {
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <div>
        <InfoModal show={this.state.showModal} onCloseInfoModel={this.onCloseInfoModel}></InfoModal>
        <div className='container vh-100'>
          <div className='row padding-top-2 text-center'>
            <h2>{this.props.buildingInfo.street} {this.props.buildingInfo.number}</h2>
            <h5>{this.props.buildingInfo.postal}, {this.props.buildingInfo.city}, {this.props.buildingInfo.province}</h5>
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
              <div className='row'>
                <div className='col'>
                  <label>Aantal verdiepingen</label>
                  <a href='#' onClick={this.onShowInfoModal}><img className='info-img' src={image} height={20} width={20}></img></a>
                </div>
              </div>
              <input autoFocus type='number' min='0' max='99' step='1' value={this.state.floors} onChange={this.onChangeFloors} name="input-floors" className="form-control"/>
            </div>
            <div className='col'>
              <div className='row'>
                <div className='col'>
                  <label>Verdiepingshoogte in meters</label>
                  <a href='#' onClick={this.onShowInfoModal}><img className='info-img' src={image} height={20} width={20}></img></a>
                </div>
              </div>
              <input type='number' min='3.0' max='99' step='0.1' value={this.state.floorHeight} onChange={this.onChangeFloorHeight} name="input-floorHeight" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-3'>
            <div className='col'>
              <h4>Fundering</h4>
              <label>Type</label>
              <select onChange={this.onChangeFoundationType} className="form-control custom-select" name="input-foundationType">
              <option value=''></option>
                <option value='Fundering op staal'>Fundering op staal</option>
                <option value='Fundering op betonpalen'>Betonpalen</option>
                <option value='Fundering op houten palen'>Houten palen</option>
              </select>
            </div>
          </div>
          {this.state.foundationType.includes('palen') &&
          <Fade>
            <div className='row padding-top-1'>
              <div className='col'>
                <label>Funderingsdiepte in meters</label>
                <input type="text" defaultValue='10' name="input-foundationDepth" className="form-control"/>
              </div>
            </div>
          </Fade>
          }
          <div className='row padding-top-3'>
            <div className='col'>
              <h4>Hoofddraagconstructie</h4>
              <label>Type</label>
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-supportType">
                <option value=''></option>
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