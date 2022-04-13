const axios = require('axios');
require('dotenv').config();

// Get building address from the Kadaster BAG API based on postal code and house number.
async function getAddress(postalCode, houseNumber) {
    try {
        let response = await axios({
             url: 'https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressenuitgebreid?postcode=' + postalCode + '&huisnummer=' + houseNumber + '&exacteMatch=true',
             method: 'get',
             headers: {
                'X-Api-Key': process.env.API_KADASTER,
                'Accept-Crs': 'epsg:28992'
             }
         })
         // If successful, return addres info of the first object in the response data array.
         return response.data._embedded.adressen[0];
     }
     // If not successful, return the error message.
     catch(error) {
         console.log('Error: ' + error);
         return error;
     }
}

module.exports = { getAddress }