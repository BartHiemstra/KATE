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

    this.onChangeHeight = this.onChangeHeight.bind(this);

    this.onChangeFloorAmount = this.onChangeFloorAmount.bind(this);
    this.onChangeFoundationType = this.onChangeFoundationType.bind(this);
    this.onChangeFoundationDepth = this.onChangeFoundationDepth.bind(this);
    this.onChangeSupport = this.onChangeSupport.bind(this);
    
    this.onShowInfoModal = this.onShowInfoModal.bind(this);
    this.onCloseInfoModel = this.onCloseInfoModel.bind(this);

    this.onCalculate = this.onCalculate.bind(this);
    this.onReturn = this.onReturn.bind(this);

    this.state = {
      showModal: false,

      inputHeight: '',

      inputFloorAmount: (typeof inputFloorAmount === 'undefined') ? '' : this.props.inputValues.inputFloorAmount,
      inputFoundationType: (typeof inputFoundationType === 'undefined') ? '' : this.props.inputValues.inputFoundationType,
      inputFoundationDepth: (typeof inputFoundationDepth === 'undefined') ? '' : this.props.inputValues.inputFoundationDepth,
      inputSupportType: (typeof inputSupportType === 'undefined') ? '' : this.props.inputValues.inputSupportType,
    }
  }

  onChangeHeight(e) {
    var height = e.target.value;
    if(height < 0 || height > 999 || height.length > 5) {
      height = '';
    }
    this.setState({ inputHeight: height })
  }

  onChangeFloorAmount(e) {
    var floorAmount = e.target.value;
    if(floorAmount < 0 || floorAmount > 99 || floorAmount.length > 2) {
      floorAmount = '';
    }
    this.setState({ inputFloorAmount: floorAmount })
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
      inputFoundationType: this.state.foundationType,
      inputFoundationDepth: this.state.foundationDepth,
      inputSupportType: this.state.supportType
    }

    axios.get(API_BASE_URL + 'calculation/calculate', { 
      params: {
        height: this.props.buildingInfo.height > 0 ? this.props.buildingInfo.height : this.state.inputHeight,
        length: this.props.buildingInfo.length,
        area: this.props.buildingInfo.area,
        floorAmount: this.state.inputFloorAmount,
        foundationType: 'Fundering.type.' + this.state.inputFoundationType,
        foundationDepth: this.state.inputFoundationDepth,
        supportType: 'Hoofddraagconstructie.type.' + this.state.inputSupportType,
    }})
    .then(response => {        
        // On success, pass the building value to parent class then call for Results screen.
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
            <h5>{this.props.buildingInfo.postal}, {this.props.buildingInfo.city}</h5>
          </div>
          <div className='row padding-top-3'>
            <div className='col'>
              <h4>Geometrie
                <button onClick={this.onShowInfoModal}><img alt='Toon meer informatie' className='info-img' src={image} height={25} width={25}></img></button>
              </h4>
            </div>
          </div>
          {this.props.buildingInfo.height > 0 && 
            <div className='row'>
              <div className='col'>
                <label>Hoogte</label>
                <input readOnly value={parseFloat(this.props.buildingInfo.height).toFixed(1) + ' m'} name="geometry-height" className="form-control"/>
              </div>
            </div>
          }
          {this.props.buildingInfo.height === 0 &&
            <div className='row'>
              <div className='col'>
                <label>Hoogte in meters</label>
                <div className={this.state.inputHeight.length > 2 ? 'suffix-longer' : 'suffix'}>m</div>
                <input type='number' min='0' max='200' step='0.1' value={this.state.inputHeight} onChange={this.onChangeHeight} name="input-height" className="form-control" onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }/>
              </div>
            </div>
          }
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Omtrek</label>
              <input readOnly type="text" value={Math.round(this.props.buildingInfo.length) + ' m'} name="geometry-length" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Oppervlakte</label>
              <input readOnly type="text" value={Math.round(this.props.buildingInfo.area) + ' m2'} name="geometry-area" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>Aantal bouwlagen</label>
              <input type='number' min='0' max='99' step='1' value={this.state.inputFloorAmount} onChange={this.onChangeFloorAmount} name="input-floorAmount" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-3'>
            <div className='col'>
              <h4>Fundering</h4>
              <label>Type</label>
              <select onChange={this.onChangeFoundationType} className="form-control custom-select" name="input-foundationType" id='input-foundationType'>
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
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-supportType" id='input-supportType'>
                <option value=''></option>
                <option value='Staal'>Staal</option>
                <option value='Beton'>Beton</option>
                <option value='Metselwerk'>Metselwerk</option>
              </select>
            </div>
          </div>
          <div className='row padding-top-3'>
            <div className='col'>
              <h4>Vloeren</h4>
              <label>Type constructievloer</label>
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-constructionFloor">
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
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-equalityFloor">
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
              <select onChange={this.onChangeSupport} className="form-control custom-select" name="input-finishFloor">
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
              <input type='number' min='0' max='100' step='1' name="input-percentageOpen" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-2'>
            <div className='col'>
              <Button id='btn-back' variant="outline-primary" onClick={this.onReturn}>Vorige</Button>
              <Button id='btn-continue' variant="primary" onClick={this.onCalculate}>Bereken restwaarde</Button>
            </div>
          </div>
          <div className='padding-bottom-2'></div>
        </div>
      </div>
    )
  }
}