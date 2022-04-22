//Import corresponding DAO functions from Repository layer.
const { getMaterials, getMaterialByName } = require('../repositories/material_dao.js');

const { getFormula } = require('../services/formulas_service.js');

async function calculateResidualValue(input) {
    var area = parseFloat(input.area);
    var length = parseFloat(input.length);
    var height = parseFloat(input.height);
    var volume = parseFloat(area * height);

    var floorAmount = parseFloat(input.floorAmount);
    var foundationType = String(input.foundationType);
    var foundationDepth = String(input.foundationDepth);
    var supportType = String(input.supportType);

    const materialFoundationType = await getMaterialByName(foundationType.split('.')[0], foundationType.split('.')[1], foundationType.split('.')[2])    
    const materialSupportType = await getMaterialByName(supportType.split('.')[0], supportType.split('.')[1], supportType.split('.')[2]);

    const formulaSupportType = await getFormula(supportType);

    //TODO: Make nameless, so that they can be read out in for() loop in frontend for better modularity.
    var residualValue = {
        foundationPikes: {
            name: 'Funderingspalen',
            material: materialFoundationType.materialName,
            unitType: materialFoundationType.unitType,
            total: (1/9) * parseFloat(area) * 0.40 * 0.40 * foundationDepth * materialFoundationType.weight / 1000,
            value:  (1/9) * parseFloat(area) * 0.40 * 0.40 * foundationDepth * materialFoundationType.weight / 1000 * materialFoundationType.value
        },
        foundationBeams: {
            name: 'Funderingsbalken',
            material: materialFoundationType.materialName,
            unitType: materialFoundationType.unitType,
            total: (1/6) * (length / 2) * 0.40 * 0.60 * materialFoundationType.weight / 1000,
            value: (1/6) * (length / 2) * 0.40 * 0.60 * materialFoundationType.weight / 1000 * materialFoundationType.value
        },
        supportType: {
            name: 'Hoofddraagconstructie',
            material: materialSupportType.materialName,
            unitType: materialSupportType.unitType,
            total: ((0.3 * (floorAmount + 1) * area) + (0.2 * length * height)) * materialSupportType.weight / 1000,
            value: ((0.3 * (floorAmount + 1) * area) + (0.2 * length * height)) * materialSupportType.weight / 1000 * materialSupportType.value
        }
    }
    residualValue['total'] = { value: (residualValue.foundationPikes.value + residualValue.foundationBeams.value + residualValue.supportType.value) }

    return residualValue;
}

module.exports = { calculateResidualValue }