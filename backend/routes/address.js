const axios = require('axios');
const router = require('express').Router();
<<<<<<< HEAD
require('dotenv').config();
=======
>>>>>>> d8ca6f9 (Initial commit)

//GET request: Return building info acquired from Kadaster API based on postal code and house number.
router.route('/:postalCode/:houseNumber').get((req, res) => {
  axios.get('https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressenuitgebreid?postcode=' + req.params.postalCode + '&huisnummer=' + req.params.houseNumber + '&exacteMatch=true', {
      headers: {
<<<<<<< HEAD
        'X-Api-Key': process.env.API_KADASTER,
=======
        'X-Api-Key': 'l760c9d815d7734995a926ed3303190e50',
>>>>>>> d8ca6f9 (Initial commit)
        'Accept-Crs': 'epsg:28992'
      }
    })
    .then(response => res.send(response.data))
<<<<<<< HEAD
    .catch(err => console.log('Error: ' + err)); //TODO: Respond with error code
=======
    .catch(err => console.log('Error: ' + err));
>>>>>>> d8ca6f9 (Initial commit)
});

module.exports = router;