import React, { Component } from 'react';
import Autocomplete from "react-google-autocomplete";
import axios from 'axios';

import './screen_address.css';

// Fetch API-related data from environment file.
const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const GOOGLE_API_KEY = process.env.REACT_APP_API_GOOGLE_PLACES;

// Create transformation object which will convert Lon/Lat(EPSG 4326) coordinate system to RD(EPSG 28992) coordindate system.
//const transformation = require('transform-coordinates')
const transformation = require('../../../common.js')
const TRANSFORM = transformation('EPSG:4326', 'EPSG:28992')

export default class ScreenAddress extends Component {
    constructor(props) {
        super(props);
    }

    // Fetch building info from backend based on input address, then store it in the 'building' object.
    //TODO: Put in get request methods in different file?
    getBuildingInfo(postalCode, houseNumber) {
        axios.get(API_BASE_URL + 'buildings/getBuildingInfo/' + postalCode + '/' + houseNumber)
        .then(response => {
            console.log(response.data);
            // On success, get the values of interest from response data and put it in 'buildingInfo'.
            var buildingInfo = {
                 postal: postalCode,
                 street: response.data.openbareRuimteNaam,
                 number: response.data.huisnummer,
                 city: response.data.woonplaatsNaam,
                 year: response.data.oorspronkelijkBouwjaar,
                 surface: response.data.oppervlakte,
                 area: response.data.area,
                 length: response.data.length,
                 height: response.data.height
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
                                    /*
                                    // Get the Latitude and Longitude coordinates from Google Places
                                    let lat = place.geometry.location.lat();
                                    let lng = place.geometry.location.lng();
                                    console.log(lat + "," + lng);

                                    // Convert the Latitude and Longitude coorindates to RijksDriehoeks X and Y coordinates.
                                    var coordinatesRD = TRANSFORM.forward({x: lng, y: lat});

                                    console.log(coordinatesRD.x + " | " + coordinatesRD.y);

                                    this.getBuildingInfo(coordinatesRD.x, coordinatesRD.y);
                                    
                                    return;
                                    */

                                    // When a place is selected, search for postal code and house number in the address_components array.
                                    //TODO: Let backend handle the logic
                                    let postalCode = null
                                    let houseNumber = null
                                    place?.address_components?.forEach(entry => {
                                        if (entry.types?.[0] === "postal_code") {
                                            postalCode = entry.long_name.replace(/ /g, '');
                                        }
                                        if (entry.types?.[0] === "street_number") {
                                            houseNumber = entry.long_name;
                                        }
                                    })
                                    // If both address components are found (!null), call getBuildingInfo().
                                    if(postalCode && houseNumber) {
                                        console.log(postalCode + "." + houseNumber);
                                        this.getBuildingInfo(postalCode, houseNumber)
                                    }
                                    // If any address component is null, that means Google Places doesn't recognize it. Try to find the building based on custom input.
                                    else {
                                        // Create empty variables for postal code and house number.
                                        let postalCode = null;
                                        let houseNumber = null;

                                        // Split the input-address on the ',' character.
                                        let fullAddress = place.name;

                                        // Create regex strings for finding the postal code and housenumber in a string.
                                        let regexPostal = / *[0-9]{4} *[A-Z]{2}/;
                                        let regexNumber = / *[0-9]{1,5} */;

                                        console.log(fullAddress);

                                        // Search postal    code and house number based on regex, convert to string, and remove any whitespace.
                                        postalCode = fullAddress.match(regexPostal).toString().replace(/\s/g, '');
                                        houseNumber = fullAddress.match(regexNumber).toString().replace(/\s/g, '');

                                        // If input postal code and housenumber are found using RegularExpressions, call buildingInfo with them.
                                        if(postalCode && houseNumber) {
                                            console.log("yes");
                                            this.getBuildingInfo(postalCode, houseNumber)
                                        }
                                        // TODO: Error validation.
                                        else {
                                            console.log("No");
                                            console.log("FOut");

                                        }
                                        console.log("Postal code =" + postalCode);
                                        console.log("HouseNumber=" + houseNumber);
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