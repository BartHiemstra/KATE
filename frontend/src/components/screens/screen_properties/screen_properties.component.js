import React, { Component } from 'react';
import axios from 'axios';

import './screen_properties.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class ScreenProperties extends Component {
  constructor(props) {
    super(props);

    this.onChangeAddressPostal = this.onChangeAddressPostal.bind(this);
    this.onChangeAddressHouseNum = this.onChangeAddressHouseNum.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.scrollRef = React.createRef()

    this.state = {
      addressPostal: '',
      addressHouseNum: '',
      buildingInfo: '',
      buildingStreet: '',
      buildingNumer: '',
      buildingYear: '',
      buildingSurface: ''
    }
  }

  onChangeAddressPostal(e) {
    this.setState({
      addressPostal: e.target.value
    })
  }

  onChangeAddressHouseNum(e) {
    this.setState({
      addressHouseNum: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    axios.get(BASE_URL + 'address/' + this.state.addressPostal + '/' + this.state.addressHouseNum)
      .then(response => {
        this.setState({
          buildingInfo: 'Gebouwgegevens',
          buildingStreet: response.data._embedded.adressen[0].openbareRuimteNaam,
          buildingNumber: response.data._embedded.adressen[0].huisnummer,
          buildingYear: response.data._embedded.adressen[0].oorspronkelijkBouwjaar,
          buildingSurface: response.data._embedded.adressen[0].oppervlakte + ' m2'
        })
        this.scrollRef.current.scrollIntoView()
      })
      .catch(error => console.log(error)
    );
  }

  handleClick() {
  }

  render() {
    return (
      <div>
        <div className='container text-center'>
          <h5>{this.props.buildingInfo.street} {this.props.buildingInfo.number}</h5>
        </div>
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
          </div>
          <br></br>
          <div className="form-group">
            <input type="submit" value="VerSDFSDKFJSLDFKJder" className="btn btn-primary" />
          </div>
          <br></br>
          <h5 ref={this.scrollRef}>{this.state.buildingInfo}</h5>
          <label>{this.state.buildingStreet} {this.state.buildingNumber}</label>
          <br></br>
          <label>{this.state.buildingYear}</label>
          <br></br>
          <label >{this.state.buildingSurface}</label>
        </form>
        
        <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label>LALALALDSLSLDFKJ: </label>
                <input required type="text" name="input-postal" className="form-control" value={this.state.addressPostal} onChange={this.onChangeAddressPostal}/>
              </div>
              <div className='col'>
                <label>HuiSDFS:DLFLSDKJSJLDKFsnummer: </label>
                <input required type="text" name="input-housenumber" className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum}/>
              </div>
            </div>
          </div>
      </div>
    )
  }
}