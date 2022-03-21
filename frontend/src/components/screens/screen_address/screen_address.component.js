import React, { Component } from 'react';
import axios from 'axios';

import './screen_address.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class ScreenAddress extends Component {
    constructor(props) {
        super(props);

        this.onChangeAddressPostal = this.onChangeAddressPostal.bind(this);
        this.onChangeAddressHouseNum = this.onChangeAddressHouseNum.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            search: {
                address: ''
            },
            building: {
                postal: '',
                street: '',
                number: '',
                year: '',
                surface: ''
            },

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
                    building: {
                        postal: this.state.addressPostal,
                        street: response.data._embedded.adressen[0].openbareRuimteNaam,
                        number: response.data._embedded.adressen[0].huisnummer,
                        year: response.data._embedded.adressen[0].oorspronkelijkBouwjaar,
                        surface: response.data._embedded.adressen[0].oppervlakte
                    },
                })
                this.props.setBuilding(this.state.building)
                this.props.showComponent('Properties')
            })
            .catch(error => console.log(error)
            );
    }

    render() {
        return (
            <div>
                <div className='background-img'></div>
                <div className='container vh-100'>
                    <form onSubmit={this.onSubmit}>
                        <div className='form-group'>
                            <div className='row'>
                                <div className='col'>
                                    <label>Postcode: </label>
                                    <input required type='text' name='input-postal' className='form-control' value={this.state.addressPostal} onChange={this.onChangeAddressPostal} />
                                </div>
                                <div className='col'>
                                    <label>Huisnummer: </label>
                                    <input required type='text' name='input-housenumber' className="form-control" value={this.state.addressHouseNum} onChange={this.onChangeAddressHouseNum} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Verder" className="btn btn-primary" />
                        </div>
                    </form>
                    {/*<Button onClick={() => this.props.showComponent('Properties')}>Verderr</Button>*/}
                </div>
            </div>
        )
    }
}