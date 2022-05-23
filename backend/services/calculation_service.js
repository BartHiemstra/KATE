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

    var residualValue = [
        {
            name: 'Muren',
            material: materialWall.name,
            total: wallWidth * length * height * materialWall.weight / TONNE_MASS, //TODO: PERCENTAGE OPEN VERWERKEN
            value: wallWidth * length * height * materialWall.weight / TONNE_MASS * materialWall.value
        },
        {
            name: 'Vloeren',
            material: materialFloor.name,
            total: floorHeight * floorAmount * area * materialFloor.weight / TONNE_MASS,
            value: floorHeight * floorAmount * area * materialFloor.weight / TONNE_MASS * materialWall.value
        },
        {
            name: 'Dak',
            material: materialRoof.name,
            total: roofHeight * area * materialRoof.weight / TONNE_MASS,
            value: roofHeight * area * materialRoof.weight / TONNE_MASS * materialRoof.value
        },
        {
            name: 'Gevelbekleding',
            material: materialFacade.name,
            total: facadeWidth * length * height * materialFacade.weight / TONNE_MASS,
            value: facadeWidth * length * height * materialFacade.weight / TONNE_MASS * materialFacade.value
        }
    ];
   /* residualValue.push({
        value: residualValue.walls.value + residualValue.floors.value + residualValue.roof.value + residualValue.facade.value
    });
    */

    return residualValue;
}

module.exports = { calculateResidualValue }