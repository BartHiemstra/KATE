import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

import image from '../../../assets/images/icon_info.png';
import InfoModal from '../../modal/info_modal.component';

import './screen_properties.css';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export default class ScreenProperties extends Component {
  constructor(props) {
    super(props);

    this.onChangeFloorAmount = this.onChangeFloorAmount.bind(this);
    this.onChangeFloorHeight = this.onChangeFloorHeight.bind(this);
    this.onChangeFoundationType = this.onChangeFoundationType.bind(this);
    this.onChangeFoundationDepth = this.onChangeFoundationDepth.bind(this);
    this.onChangeSupport = this.onChangeSupport.bind(this);
    
    this.onShowInfoModal = this.onShowInfoModal.bind(this);
    this.onCloseInfoModel = this.onCloseInfoModel.bind(this);

    this.onCalculate = this.onCalculate.bind(this);
    this.onReturn = this.onReturn.bind(this);

    this.state = {
      showModal: false,

      inputLength: (typeof inputLength === 'undefined') ? '' : this.props.inputValues.inputLength,
      inputWidth: (typeof inputWidth === 'undefined') ? '' : this.props.inputValues.inputWidth,
      inputFloorAmount: (typeof inputFloorAmount === 'undefined') ? '' : this.props.inputValues.inputFloorAmount,
      inputFloorHeight: (typeof inputFloorHeight === 'undefined') ? '' : this.props.inputValues.inputFloorHeight,
      inputFoundationType: (typeof inputFoundationType === 'undefined') ? '' : this.props.inputValues.inputFoundationType,
      inputFoundationDepth: (typeof inputFoundationDepth === 'undefined') ? '' : this.props.inputValues.inputFoundationDepth,
      inputSupportType: (typeof inputSupportType === 'undefined') ? '' : this.props.inputValues.inputSupportType,
    }
  }

  onChangeFloorAmount(e) {
    var floorAmount = e.target.value;
    if(floorAmount < 0 || floorAmount > 99 || floorAmount.length > 2) {
      floorAmount = '';
    }
    this.setState({ inputFloorAmount: floorAmount })
  }

  onChangeFloorHeight(e) {
    var floorHeight = e.target.value;
    if(floorHeight < 0 || floorHeight > 9.9 || floorHeight.length > 3) {
      floorHeight = '';
    }
    this.setState({ inputFloorHeight: floorHeight })
  }

  onChangeFoundationType(e) {
    e.preventDefault()
    var foundationType = e.target.value;
    this.setState({ inputFoundationType: foundationType })
  }

  onChangeFoundationDepth(e) {
    e.preventDefault()
    var foundationDepth = e.target.value;
    if(foundationDepth < 0 || foundationDepth > 20.0 || foundationDepth.length > 4) {
      foundationDepth = '';
    }
    this.setState({ inputFoundationDepth: foundationDepth })
  }

  onChangeSupport(e) {
    var supportType = e.target.value;
    this.setState({inputSupportType: supportType })
  }

  onShowInfoModal() {
    this.setState({ showModal: true })
  }

  onCloseInfoModel() { 
    this.setState({ showModal: false })
  }

  onCalculate() {
    var inputValues = {
      inputFloorAmount: this.state.inputFloorAmount,
      inputFloorHeight: this.state.inputFloorHeight,
      inputFoundationType: this.state.foundationType,
      inputFoundationDepth: this.state.foundationDepth,
      inputSupportType: this.state.supportType
    }

    axios.get(API_BASE_URL + 'calculation/calculate', { 
      params: {
        surface: this.props.buildingInfo.surface,
        floorAmount: this.state.inputFloorAmount,
        floorHeight: this.state.inputFloorHeight,
        foundationType: 'Fundering.type.' + this.state.inputFoundationType,
        foundationDepth: this.state.inputFoundationDepth,
        supportType: 'Hoofddraagconstructie.type.' + this.state.inputSupportType,
    }})
    .then(response => {        
        // On ssuccess, pass the building value to parent class then call for Results screen.
        console.log(response);
        this.props.saveInputValues(inputValues);
        this.props.setResidualValue(response.data)
        this.props.showComponent('Results')
    })
    .catch(error => console.log(error));
  }

  onReturn() {
    this.props.showComponent('Address')
  }

  render() {
    //TODO: Fill the dropdown menus with options based on API GET request instead of manually in html.
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
              <h4>Meetgegevens
                <a href='#' onClick={this.onShowInfoModal}><img className='info-img' src={image} height={25} width={25}></img></a>
              </h4>                
              <label>Bouwjaar</label>
              <input readOnly type="text" value={this.props.buildingInfo.year} name="input-year" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Omtrek</label>
              <input readOnly type="text" value={Math.round(this.props.buildingInfo.length) + ' m'} name="input-bvo" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Oppervlakte</label>
              <input readOnly type="text" value={Math.round(this.props.buildingInfo.area) + ' m2'} name="input-bvo" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Totale gebruiksoppervlakte (GBO)</label>
              <input readOnly type="text" value={this.props.buildingInfo.surface + ' m2'} name="input-surface" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Aantal bouwlagen</label>
              <input type='number' min='0' max='99' step='1' value={this.state.inputFloorAmount} onChange={this.onChangeFloorAmount} name="input-floorAmount" className="form-control"/>
            </div>
            <div className='col'>
              <label>Bouwlaaghoogte</label>
              <div className='suffix'>m</div>
              <input type='number' min='3.0' max='9.9' step='0.1' value={this.state.inputFloorHeight} onChange={this.onChangeFloorHeight} name="input-floorHeight" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-3'>
            <div className='col'>
              <h4>Fundering</h4>
              <label>Type</label>
              <select onChange={this.onChangeFoundationType} className="form-control custom-select" name="input-foundationType">
                <option value=''></option>
                <option value='Op staal'>Fundering op staal</option>
                <option value='Betonpalen'>Betonpalen</option>
                <option value='Houten palen'>Houten palen</option>
              </select>
            </div>
          </div>
          {this.state.inputFoundationType.includes('palen') &&
          <Fade>
            <div className='row padding-top-1'>
              <div className='col'>
                <label>Funderingsdiepte</label>
                <div className='suffix-longer'>m</div>
                <input type='number' min='0.0' max='20.0' step='0.1' value={this.state.inputFoundationDepth} onChange={this.onChangeFoundationDepth} name="input-foundationDepth" className="form-control"/>
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
          <div className='row padding-top-3'>
            <div className='col'>
              <h4>Vloeren</h4>
              <label>Type constructievloer</label>
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-supportType">
                <option value=''></option>
                <option value='Beton (Gestort)'>Beton (Gestort)</option>
                <option value='Beton (Prefab)'>Beton (Prefab)</option>
                <option value='Cellenbeton'>Cellenbeton</option>
                <option value='Keramisch'>Keramisch</option>
                <option value='Staal'>Staal</option>
                <option value='Hout'>Hout</option>
              </select>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Type dekvloer</label>
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-supportType">
                <option value=''></option>
                <option value='Beton'>Beton (Gestort)</option>
                <option value='Zandcement'>Zandcement</option>
                <option value='Anhydriet'>Anhydriet</option>
                <option value='Magnesiet'>Magnesiet</option>
                <option value='Hout'>Hout</option>
                <option value='Asfalt'>Asfalt</option>
              </select>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Type afwerking</label>
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-supportType">
                <option value=''></option>
                <option value='Gietvloer'>Gietvloer</option>
                <option value='Tapijt'>Tapijt</option>
                <option value='Hout (parket)'>Hout (parket)</option>
                <option value='PVC'>PVC</option>
                <option value='Linoleum'>Linoleum</option>
                <option value='Laminaat'>Laminaat</option>
                <option value='Natuursteen'>Natuursteen</option>
              </select>
            </div>
          </div>
          <div className='row padding-top-3'>
            <div className='col'>
              <h4>Gevel</h4>
              <label>Type gevelbekleding</label>
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-supportType">
                <option value=''></option>
                <option value='Metselwerk'>Metselwerk</option>
                <option value='Beton'>Beton</option>
                <option value='Staal'>Staal</option>
                <option value='Glas'>Glas</option>
                <option value='Aluminium'>Aluminium</option>
                <option value='Natuursteen'>Natuursteen</option>
                <option value='Kunststof'>Kunststof</option>
                <option value='Tegelwerk'>Tegelwerk</option>
                <option value='Hout'>Hout</option>
              </select>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Type kozijn</label>
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-supportType">
                <option value=''></option>
                <option value='Staal'>Staal</option>
                <option value='Aluminium'>Aluminium</option>
                <option value='Hout'>Hout</option>
                <option value='Kunststof'>Kunststof</option>
              </select>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Percentage glas</label>
              <input type='number' min='0' max='100' step='1' name="input-floorAmount" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-2'>
            <div className='col'>
              <Button variant="outline-primary" onClick={this.onReturn}>Vorige</Button>
              <Button variant="primary" onClick={this.onCalculate}>Bereken restwaarde</Button>
            </div>
          </div>
          <div className='padding-bottom-2'></div>
        </div>
      </div>
    )
  }
}