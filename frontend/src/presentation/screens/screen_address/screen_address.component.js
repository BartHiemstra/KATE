import React, { Component } from 'react';
import Autocomplete from "react-google-autocomplete";
import { withTranslation } from 'react-i18next'

// Import associated business logic functions.
import { GetPostalAndHouseNumber } from '../../../business/places.js';
import { GetBuildingInfo } from '../../../business/requests.js';

// Import associated style sheet.
import './screen_address.css';

// Retrieve Google Places API Key from environment file.
const GOOGLE_API_KEY = process.env.REACT_APP_API_GOOGLE_PLACES;

class ScreenAddress extends Component {
    render() {
        // Retrieve i18n translation data.
        const { t } = this.props;
        return (
            <div>
                <div className='background-img'></div>
                <div className='container vh-100'>
                    <div className='row semi-center'>
                        <h3>{t('title')}</h3>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Autocomplete
                                name='input-address'
                                autoFocus={true}
                                spellCheck={false}
                                language={'NL'}
                                placeholder={t('input_address')}
                                options={{ types: ['address'], componentRestrictions: { country: 'nl' } }}
                                apiKey={ GOOGLE_API_KEY }
                                onPlaceSelected={(place) => {
                                    // Get the postal code and house number from business layer.
                                    let { postalCode, houseNumber } = GetPostalAndHouseNumber(place);

                                    // Get building info object from business layer based on the address components.
                                    GetBuildingInfo(postalCode, houseNumber).then(buildingInfo => {
                                        // Pass the info to parent class then call for next screen.
                                        this.props.setBuilding(buildingInfo)
                                        this.props.showComponent('Properties')
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Export with i18n translation.
export default withTranslation()(ScreenAddress);