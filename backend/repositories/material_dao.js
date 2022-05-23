let Material = require('../models/material.model');

function getMaterials() {
    return Material.find().lean();
}

async function getMaterialByName(materialName) {
    try{
        let material = await Material.findOne({ name: materialName }).lean()
        return material;
    } catch (err) {
        console.log(err) 
    }
}

module.exports = { getMaterials, getMaterialByName }