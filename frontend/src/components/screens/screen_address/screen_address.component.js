import React, { Component } from 'react';
import Autocomplete from "react-google-autocomplete";
import axios from 'axios';

import './screen_address.css';

// Fetch API-related data from environment file.
const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const GOOGLE_API_KEY = process.env.REACT_APP_API_GOOGLE_PLACES;

export default class ScreenAddress extends Component {
    constructor(props) {
        super(props);
    }

    // Fetch building info from backend based on input address, then store it in the 'building' object.
    //TODO: Put in get request methods in different file?
    getBuildingInfo(province, postalCode, houseNumber) {
        axios.get(API_BASE_URL + 'buildings/getBuildingInfo/' + postalCode + '/' + houseNumber)
        .then(response => {
            console.log(response.data);
            // On success, get the values of interest from response data and put it in 'buildingInfo'.
            var buildingInfo = {
                 province: province,
                 postal: postalCode,
                 street: response.data.openbareRuimteNaam,
                 number: response.data.huisnummer,
                 city: response.data.woonplaatsNaam,
                 year: response.data.oorspronkelijkBouwjaar,
                 surface: response.data.oppervlakte,
                 area: response.data.area,
                 length: response.data.length
            }
            // Pass the building info to parent class then call for Properties screen.
            this.props.setBuilding(buildingInfo)
            this.props.showComponent('Properties')
        })
        .catch(error => console.log(error));
    }

    // Render Address screen
    render() {
        return (
            <div>
                <div className='background-img'></div>
                <div className='container vh-100'>
                    <div className='row semi-center'>
                        <h3>Materiële restwaarde berekenen</h3>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Autocomplete
                                autoFocus={true}
                                spellCheck={false}
                                language={'NL'}
                                options={{ types: ['address'], componentRestrictions: { country: 'nl' } }}
                                apiKey={ GOOGLE_API_KEY }
                                placeholder="Straatnaam en huisnummer"
                                onPlaceSelected={(place) => {
                                    // When a place is selected, search for province, postal code and house number in the address_components array.
                                    //TODO: Let backend handle the logic
                                    let province = null
                                    let postalCode = null
                                    let houseNumber = null
                                    place?.address_components?.forEach(entry => {
                                        if (entry.types?.[0] === "administrative_area_level_1") {
                                            province = entry.long_name;
                                        }
                                        if (entry.types?.[0] === "postal_code") {
                                            postalCode = entry.long_name.replace(/ /g, '');
                                        }
                                        if (entry.types?.[0] === "street_number") {
                                            houseNumber = entry.long_name;
                                        }
                                    })
                                    // If both address components are found (!null), call getBuildingInfo().
                                    if(province && postalCode && houseNumber) {
                                        this.getBuildingInfo(province, postalCode, houseNumber)
                                    }
                                    // Otherwise, return error message.
                                    //TODO: Return error message
                                }}
                            />
                            {/*<Button onClick={() => this.props.showComponent('Properties')}>Verderr</Button>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}