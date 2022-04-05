import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import image from '../../../assets/images/icon_info.png';
import InfoModal from '../../modal/info_modal.component';

import './screen_properties.css';

export default class ScreenProperties extends Component {
  constructor(props) {
    super(props);

    this.onChangeFloorAmount = this.onChangeFloorAmount.bind(this);
    this.onChangeFloorHeight = this.onChangeFloorHeight.bind(this);
    this.onChangeFoundationType = this.onChangeFoundationType.bind(this);
    this.onChangeFoundationDepth = this.onChangeFoundationDepth.bind(this);
    
    this.onShowInfoModal = this.onShowInfoModal.bind(this);
    this.onCloseInfoModel = this.onCloseInfoModel.bind(this);

    this.onCalculate = this.onCalculate.bind(this);

    this.state = {
      showModal: false,

      inputFloorAmount: '',
      inputFloorHeight: '',
      inputFoundationType: '',
      inputFoundationDepth: '',
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

  onShowInfoModal() {
    this.setState({ showModal: true })
  }

  onCloseInfoModel() { 
    this.setState({ showModal: false })
  }

  onCalculate() {
    this.props.showComponent('Results')
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
              <h4>Algemeen
                <a href='#' onClick={this.onShowInfoModal}><img className='info-img' src={image} height={25} width={25}></img></a>
              </h4>                
              <label>Bouwjaar</label>
              <input readOnly type="text" value={this.props.buildingInfo.year} name="input-year" className="form-control"/>
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
              <input autoFocus type='number' min='0' max='99' step='1' value={this.state.inputFloorAmount} onChange={this.onChangeFloorAmount} name="input-floorAmount" className="form-control"/>
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
              <button type="button" onClick={this.onCalculate} className="btn btn-primary">Bereken restwaarde</button>
            </div>
          </div>
          <div className='padding-bottom-2'></div>
        </div>
      </div>
    )
  }
}