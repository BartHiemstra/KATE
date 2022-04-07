let Material = require('../models/material.model');

function getMaterials() {
    return Material.find().lean();
}

async function getMaterialByName(componentName, labelName, materialName) {
    try{
        let material = await Material.findOne({ componentName: componentName, labelName: labelName, name: materialName}).lean()
        return material;
    } catch (err) {
        console.log(err) 
    }
}

module.exports = { getMaterials, getMaterialByName }