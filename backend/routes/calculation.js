const router = require('express').Router();

//Import corresponding service functions from services layer.
const { calculateResidualValue } = require('../services/calculation_service.js');

// GET request for /calculate.
router.route('/calculate').get(async function(req, res) {
    // Let CalculationService in the services layer handle the request.
    const calculatedResidualValues = await calculateResidualValue(req.query)

    // Return the outcome response to sender as JSON.
    res.json(calculatedResidualValues)
});

module.exports = router;