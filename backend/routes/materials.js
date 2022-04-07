const router = require('express').Router();
let Material = require('../models/material.model');

router.route('/').get((req, res) => {
  Material.find()
    .then(materials => res.json(materials))
    .catch(errorMessage => res.status(400).json('Error: ' + errorMessage));
});

router.route('/add').post((req, res) => {
//TODO: Create MaterialServices.js to handle db communication.
  const name = req.body.name;
  const componentName = req.body.componentName;
  const labelName = req.body.labelName;
  const materialName = req.body.materialName;
  const unitType = req.body.unitType;
  const pricePerUnit = req.body.pricePerUnit;

  const newMaterial = new Material({name, labelName, componentName, materialName, unitType, pricePerUnit});

  newMaterial.save()
    .then(() => res.json('Success'))
    .catch(errorMessage => res.status(400).json('Error: ' + errorMessage));
});

module.exports = router;