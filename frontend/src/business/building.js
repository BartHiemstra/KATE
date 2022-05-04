import axios from 'axios';

// Retrieve backend API base URL from environment file.
const API_BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch building info from backend.    
export async function GetBuildingInfo(postalCode, houseNumber) {
    let buildingInfo = null;

    await axios.get(API_BASE_URL + 'buildings/getBuildingInfo/' + postalCode + '/' + houseNumber)
    .then(response => {
        // On success, get the values response data and return as buildingInfo object.
        buildingInfo = {
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
    })
    //TODO: Handle error.
    .catch(error => console.log(error));
    
    return buildingInfo;
}