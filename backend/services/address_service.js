//Import API Service functions.
const { getRequest } = require('../services/api_service.js');
const axios = require('axios');

require('dotenv').config();

// Get building address from the Kadaster BAG API based on postal code and house number.
async function getAddress(postalCode, houseNumber) {
    /*
    const BAG3D_URL = "https://data.3dbag.nl/api/BAG3D_v2/wfs?service=wfs&version=1.3.0&crs=EPSG%3A28992&request=GetFeature&typeName=BAG3Gv_2%3Alod12&bbox=" + coordinateX + "%2C" + coordinateY + "%2C" + coordinateX + "%2C" + coordinateY + "&outputFormat=application%2Fjson"
    console.log(BAG3D_URL);
    var response = await getRequest(BAG3D_URL);

    console.log(response.data.features);
    return response.data.features;


    */
    try {
        let response = await axios({
             url: 'https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressenuitgebreid?postcode=' + postalCode + '&huisnummer=' + houseNumber + '&exacteMatch=true',
             method: 'get',
             headers: {
                'X-Api-Key': process.env.API_KADASTER,
                'Accept-Crs': 'epsg:28992',
             },
         })
         // If successful, return addres info of the first object in the response data array.
         //TODO: Only send necessary data in English instead of whole object.
         return response.data._embedded.adressen[0];
     }
     // If not successful, return the error message.
     catch(error) {
         console.log('Error: ' + error);
         return error;
     }
}

module.exports = { getAddress }