//Import corresponding DAO functions from Repository layer.
const { getMaterials, getMaterialByName } = require('../repositories/material_dao.js');

async function calculateResidualValue(input) {
    var area = parseFloat(input.area);
    var length = parseFloat(input.length);
    var height = parseFloat(input.height);
    var floorAmount = parseFloat(input.floorAmount);
    var wallType = String(input.wallType);
    var wallWidth = parseFloat(input.wallWidth);
    var percentageOpen = parseFloat(input.percentageOpen);
    var floorType = String(input.floorType);
    var floorHeight = parseFloat(input.floorHeight);
    var roofType = String(input.roofType);
    var roofHeight = parseFloat(input.roofHeight);
    var facadeType = String(input.facadeType);
    var facadeWidth = parseFloat(input.facadeWidth);

    const TONNE_MASS = 1000;
    const materialWall = await getMaterialByName(wallType);
    const materialFloor = await getMaterialByName(floorType);
    const materialRoof = await getMaterialByName(roofType);
    const materialFacade = await getMaterialByName(facadeType);

    // Calculate residual mass of materials by taking their volume, multiplying by material-specific weight, and then dividing by 1000 to get the amount of tonnes.
    // Then calculate residual value by multiplying material mass by its value per tonne.
    // Where applicable, reduce material mass by taking out its open percentage value.
    var residualValue = [
        {
            name: 'walls',
            material: materialWall.name,
            total: wallWidth * length * height * materialWall.weight / TONNE_MASS * (1 - percentageOpen / 100),
            value: wallWidth * length * height * materialWall.weight / TONNE_MASS * (1 - percentageOpen / 100) * materialWall.value
        },
        {
            name: 'floors',
            material: materialFloor.name,
            total: floorHeight * floorAmount * area * materialFloor.weight / TONNE_MASS,
            value: floorHeight * floorAmount * area * materialFloor.weight / TONNE_MASS * materialWall.value
        },
        {
            name: 'roof',
            material: materialRoof.name,
            total: roofHeight * area * materialRoof.weight / TONNE_MASS,
            value: roofHeight * area * materialRoof.weight / TONNE_MASS * materialRoof.value
        },
        {
            name: 'facade_cladding',
            material: materialFacade.name,
            total: facadeWidth * length * height * materialFacade.weight / TONNE_MASS * (1 - percentageOpen / 100),
            value: facadeWidth * length * height * materialFacade.weight / TONNE_MASS * (1 - percentageOpen / 100) * materialFacade.value
        }
    ];
    // Calculate total residual value and add to the residualValue array.
    residualValue.push({
        name: 'total',
        value: residualValue[0].value + residualValue[1].value + residualValue[2].value + residualValue[3].value
    });

    return residualValue;
}

module.exports = { calculateResidualValue }