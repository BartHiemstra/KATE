import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next'
import axios from 'axios';

import { GetResidualValue } from '../../../business/requests.js';

import image from '../../../assets/images/icon_info.png';
import InfoModal from '../../modal/info_modal.component';
import LanguageSelector from '../../header/language_selector.component';

import './screen_properties.css';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class ScreenProperties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,

      inputFloorAmount: '',
      inputWallWidth: '0.3',
      inputPercentageOpen: '20',
      inputFloorHeight: '0.3',
      inputRoofHeight: '0.3',
      inputFacadeWidth: '0.1'
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

  onChangeWallType(e) {
    var wallType = e.target.value;
    this.setState({inputWallType: wallType })
  }

  onChangeWallWidth(e) {
    e.preventDefault()
    var wallWidth = e.target.value;
    if(wallWidth < 0 || wallWidth > 5.0 || wallWidth.length > 4) {
      wallWidth = '';
    }
    this.setState({ inputWallWidth: wallWidth })
  }

  onChangePercentageOpen(e) {
    var percentageOpen = e.target.value;
    if(percentageOpen < 0 || percentageOpen > 99 || percentageOpen % 1 !== 0) {
      percentageOpen = '';
    }
    this.setState({ inputPercentageOpen: percentageOpen })
  }

  onChangeFloorType(e) {
    var floorType = e.target.value;
    this.setState({ inputFloorType: floorType })
  }

  onChangeFloorHeight(e) {
    e.preventDefault()
    var floorHeight = e.target.value;
    if(floorHeight < 0 || floorHeight > 5.0 || floorHeight.length > 4) {
      floorHeight = '';
    }
    this.setState({ inputFloorHeight: floorHeight })
  }

  onChangeFacadeType(e) {
    var facadeType = e.target.value;
    this.setState({ inputFacadeType: facadeType })
  }

  onChangeFacadeWidth(e) {
    e.preventDefault()
    var facadeWidth = e.target.value;
    if(facadeWidth < 0 || facadeWidth > 5.0 || facadeWidth.length > 4) {
      facadeWidth = '';
    }
    this.setState({ inputFacadeWidth: facadeWidth })
  }

  onChangeRoofType(e) {
    var roofType = e.target.value;
    this.setState({ inputRoofType: roofType })
  }

  onChangeRoofHeight(e) {
    e.preventDefault()
    var roofHeight = e.target.value;
    if(roofHeight < 0 || roofHeight > 5.0 || roofHeight.length > 4) {
      roofHeight = '';
    }
    this.setState({ inputRoofHeight: roofHeight })
  }

  onShowInfoModalGeometry() {
    this.setState({ showModalGeometry: true })
  }

  onShowInfoModalWalls() {
    this.setState({ showModalWalls: true })
  }

  onShowInfoModalFloors() {
    this.setState({ showModalFloors: true })
  }

  onShowInfoModalRoof() {
    this.setState({ showModalRoof: true })
  }

  onShowInfoModalFacade() {
    this.setState({ showModalFacade: true })
  }

  onCloseInfoModal() { 
    this.setState({
      showModalGeometry: false,
      showModalWalls: false,
      showModalFloors: false,
      showModalRoof: false,
      showModalFacade: false
    })
  }

  onCalculate() {
    // Put userinput into an object.
    var inputValues = {
      height: this.props.buildingInfo.height > 0 ? this.props.buildingInfo.height : this.state.inputHeight,
      length: this.props.buildingInfo.length,
      area: this.props.buildingInfo.area,
      floorAmount: this.state.inputFloorAmount,
      wallType: this.state.inputWallType,
      wallWidth: this.state.inputWallWidth,
      percentageOpen: this.state.inputPercentageOpen,
      floorType: this.state.inputFloorType,
      floorHeight: this.state.inputFloorHeight,
      roofType: this.state.inputRoofType,
      roofHeight: this.state.inputRoofHeight,
      facadeType: this.state.inputFacadeType,
      facadeWidth: this.state.inputFacadeWidth
    }

    // Send GET-request to API through business layer, then pass info to parent class and call for next screen.
    GetResidualValue(inputValues).then(residualValue => {
        this.props.saveInputValues(inputValues);
        this.props.setResidualValue(residualValue)
        this.props.showComponent('Results')
    });
  }

  // Return to previous screen.
  onBack() {
    this.props.showComponent('Address')
  }

  render() {
    // Retrieve i18n translation data.
    const { t } = this.props;

    return (
      <div>
        <div className='container vh-100'>
          <div className='row padding-top-1'><LanguageSelector></LanguageSelector></div>
          <div className='row padding-top-3 text-center'>            
            <h2>{this.props.buildingInfo.street} {this.props.buildingInfo.number}</h2>
            <h5>{this.props.buildingInfo.postal}, {this.props.buildingInfo.city}</h5>            
          </div>
          <div className='row padding-top-4'>
            <div className='col'>
              <h4>{t('section_geometry')}
                <InfoModal show={this.state.showModalGeometry} onCloseInfoModal={this.onCloseInfoModal.bind(this)} title={t('section_geometry')} text={t('info_geometry')} closeMessage={t('button_close')}></InfoModal>
                <button onClick={this.onShowInfoModalGeometry.bind(this)}><img alt='Toon meer informatie' className='info-img' src={image} height={25} width={25}></img></button>
              </h4>
            </div>
          </div>
          {this.props.buildingInfo.height > 0 && 
            <div className='row'>
              <div className='col'>
                <label>{t('label_height')}</label>
                <input readOnly value={parseFloat(this.props.buildingInfo.height).toFixed(1) + ' m'} name="geometry-height" className="form-control"/>
              </div>
            </div>
          }
          {this.props.buildingInfo.height === 0 &&
            <div className='row'>
              <div className='col'>
                <label>{t('label_height')}</label>
                <div className={this.state.inputHeight.length > 2 ? 'suffix-longer' : 'suffix'}>m</div>
                <input type='number' min='0' max='200' step='0.1' value={this.state.inputHeight} onChange={this.onChangeHeight.bind(this)} name="input-height" className="form-control" onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }/>
              </div>
            </div>
          }
          <div className='row padding-top-1'>
            <div className='col'>
              <label>{t('label_circumference')}</label>
              <input readOnly type="text" value={Math.round(this.props.buildingInfo.length) + ' m'} name="geometry-length" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>{t('label_surface')}</label>
              <input readOnly type="text" value={Math.round(this.props.buildingInfo.area) + ' m2'} name="geometry-area" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>{t('label_buildinglayers')}</label>
              <input type='number' min='0' max='99' step='1' value={this.state.inputFloorAmount} onChange={this.onChangeFloorAmount.bind(this)} name="input-floorAmount" className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-4'>
            <div className='col'>
              <h4>{t('section_walls')}
                <InfoModal show={this.state.showModalWalls} onCloseInfoModal={this.onCloseInfoModal.bind(this)} title={t('section_walls')} text={t('info_walls')} closeMessage={t('button_close')}></InfoModal>
                <button onClick={this.onShowInfoModalWalls.bind(this)}><img alt='Toon meer informatie' className='info-img' src={image} height={25} width={25}></img></button>
              </h4>
              <label>{t('label_construction_walls')}</label>
              <select onChange={this.onChangeWallType.bind(this)} className="form-control custom-select" name="input-wallType" id='input-wallType'>
                <option value=''></option>
                <option value='Beton'>Beton</option>
                <option value='Staal'>Staal</option>
                <option value='Metselwerk'>Metselwerk</option>
              </select>
            </div>
            <div className='col padding-img'>
              <h4> ‌‌ </h4>
              <label>{t('label_thickness')}</label>
              <div className='suffix-longer'>m</div>
              <input type='number' min='0.0' max='5.0' step='0.1' value={this.state.inputWallWidth} onChange={this.onChangeWallWidth.bind(this)} name="input-wallWidth" id='input-wallWidth' className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-1'>
            <div className='col'>
              <label>{t('label_percentage_open_walls')}</label>
              <div className='suffix'>%</div>
              <input type='number' min='0' max='99' step='1' value={this.state.inputPercentageOpen} onChange={this.onChangePercentageOpen.bind(this)} name="input-percentageOpen" id='input-percentageOpen' className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-4'>
            <div className='col'>
              <h4>{t('section_floors')}
                <InfoModal show={this.state.showModalFloors} onCloseInfoModal={this.onCloseInfoModal.bind(this)} title={t('section_floors')} text={t('info_floors')} closeMessage={t('button_close')}></InfoModal>
                <button onClick={this.onShowInfoModalFloors.bind(this)}><img alt='Toon meer informatie' className='info-img' src={image} height={25} width={25}></img></button>
              </h4>
              <label>{t('label_construction_floors')}</label>
              <select onChange={this.onChangeFloorType.bind(this)} className="form-control custom-select" name="input-floorType" id='input-floorType'>
                <option value=''></option>
                <option value='Beton'>Beton</option>
                <option value='Hout'>Hout</option>
              </select>
            </div>
            <div className='col padding-img-4'>
              <h4> ‌‌ </h4>
              <label>{t('label_thickness')}</label>
              <div className='suffix-longer'>m</div>
              <input type='number' min='0.0' max='5.0' step='0.1' value={this.state.inputFloorHeight} onChange={this.onChangeFloorHeight.bind(this)} name="input-floorHeight" id='input-floorHeight' className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-4'>
            <div className='col'>
              <h4>{t('section_roof')}
                <InfoModal show={this.state.showModalRoof} onCloseInfoModal={this.onCloseInfoModal.bind(this)} title={t('section_roof')} text={t('info_roof')} closeMessage={t('button_close')}></InfoModal>
                <button onClick={this.onShowInfoModalRoof.bind(this)}><img alt='Toon meer informatie' className='info-img' src={image} height={25} width={25}></img></button>
              </h4>
              <label>{t('label_construction_roof')}</label>
              <select onChange={this.onChangeRoofType.bind(this)} className="form-control custom-select" name="input-roofType" id='input-roofType'>
                <option value=''></option>
                <option value='Beton'>Beton</option>
                <option value='Hout'>Hout</option>
              </select>
            </div>
            <div className='col padding-img'>
              <h4> ‌‌ </h4>
              <label>{t('label_thickness')}</label>
              <div className='suffix-longer'>m</div>
              <input type='number' min='0.0' max='5.0' step='0.1' value={this.state.inputRoofHeight} onChange={this.onChangeRoofHeight.bind(this)} name="input-roofHeight" id='input-roofHeight' className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-4'>
            <div className='col'>
              <h4>{t('section_facade')}
                <InfoModal show={this.state.showModalFacade} onCloseInfoModal={this.onCloseInfoModal.bind(this)} title={t('section_facade')} text={t('info_facade')} closeMessage={t('button_close')}></InfoModal>
                <button onClick={this.onShowInfoModalFacade.bind(this)}><img alt='Toon meer informatie' className='info-img' src={image} height={25} width={25}></img></button>
              </h4>
              <label>{t('label_cladding_facade')}</label>
              <select onChange={this.onChangeFacadeType.bind(this)} className="form-control custom-select" name="input-facadeType" id='input-facadeType'>
                <option value=''></option>
                <option value='Beton'>Beton</option>
                <option value='Staal'>Staal</option>
                <option value='Metselwerk'>Metselwerk</option>
                <option value='Hout'>Hout</option>
                <option value='Aluminium'>Aluminium</option>
                <option value='Glas'>Glas</option>
              </select>
            </div>
            <div className='col padding-img-4'>
              <h4> ‌‌ </h4>
              <label>{t('label_thickness')}</label>
              <div className='suffix-longer'>m</div>
              <input type='number' min='0.0' max='5.0' step='0.1' value={this.state.inputFacadeWidth} onChange={this.onChangeFacadeWidth.bind(this)} name="input-facadeWidth" id='input-facadeWidth' className="form-control"/>
            </div>
          </div>
          <div className='row padding-top-3'>
            <div className='col'>
              <Button id='btn-back' variant="outline-primary" onClick={this.onBack.bind(this)}>{t('button_back')}</Button>
              <Button id='btn-continue' variant="primary" onClick={this.onCalculate.bind(this)}>{t('button_calculate')}</Button>
            </div>
          </div>
          <div className='padding-bottom-2'></div>
        </div>
      </div>
    )
  }
}

// Export with i18n translation.
export default withTranslation()(ScreenProperties);