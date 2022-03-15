const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();

//GET request: Return building info acquired from Kadaster API based on postal code and house number.
router.route('/:postalCode/:houseNumber').get((req, res) => {
  axios.get('https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressenuitgebreid?postcode=' + req.params.postalCode + '&huisnummer=' + req.params.houseNumber + '&exacteMatch=true', {
      headers: {
        'X-Api-Key': process.env.API_KADASTER,
        'Accept-Crs': 'epsg:28992'
      }
    })
    .then(response => res.send(response.data))
    .catch(err => console.log('Error: ' + err)); //TODO: Respond with error code
});

module.exports = router;