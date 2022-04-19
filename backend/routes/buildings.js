const router = require('express').Router();

//Import corresponding service functions from services layer.
const { getAddress } = require('../services/address_service.js');
const { getGeometry } = require('../services/geo_service.js');

//GET request for address with params postalCode and houseNumber.
router.route('/getBuildingInfo/:postalCode/:houseNumber').get(async function(req, res) {
  const postal = req.params.postalCode;
  const number = req.params.houseNumber;
  
  // Get building address from AddressService based on postal code and housenumber.
  var address = await getAddress(postal, number);

  // Take the building ID and coordinates from address and then get building geometry from GeometryService.
  var buildingId = address.pandIdentificaties[0];
  var buildingCoordinates = address.adresseerbaarObjectGeometrie.punt.coordinates;
  var geometry = await getGeometry(buildingId, buildingCoordinates);

  //Merge building address and geometry into a single object.
  var buildingInfo = {...address, ...geometry }

  // Respond to sender with the outcome object as JSON.
  res.json(buildingInfo);
});

module.exports = router;