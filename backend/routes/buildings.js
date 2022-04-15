const router = require('express').Router();

//Import corresponding service functions from services layer.
const { getAddress } = require('../services/address_service.js');
const { getGeometry } = require('../services/geo_service.js');

//GET request for address with params postalCode and houseNumber.
router.route('/getBuildingInfo/:postalCode/:houseNumber').get(async function(req, res) {
  const postal = req.params.postalCode;
  const number = req.params.houseNumber;
  
  // Get building address from AddressService.
  var address = await getAddress(postal, number);

  // Get building geometry from GeoService.
  var geometry = await getGeometry(address.pandIdentificaties[0]);

  //Merge building address and geometry into a single object.
  var buildingInfo = {...address, ...geometry }

  // Respond to sender with the outcome object as JSON.
  res.json(buildingInfo);
});

module.exports = router;