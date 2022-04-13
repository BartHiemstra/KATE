const router = require('express').Router();

//Import corresponding service functions from services layer.
const { getAddress } = require('../services/address_service.js');

//GET request for address with params postalCode and houseNumber.
router.route('/:postalCode/:houseNumber').get(async function(req, res) {
  const postal = req.params.postalCode;
  const number = req.params.houseNumber;
  
  // Let AddressService handle the request.
  var data = await getAddress(postal, number)

  // Respond to sender with the outcome as JSON.
  res.json(data);
});

module.exports = router;