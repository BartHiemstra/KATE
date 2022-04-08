//Import corresponding DAO functions from Repository layer.
const { getMaterials, getMaterialByName } = require('../repositories/material_dao.js');

const { getFormula } = require('../services/formulas_service.js');

async function calculateResidualValue(input) {
    var surface = String((input.surface / input.floorAmount));
    var length = String(input.length);
    var width = String(input.width);
    var floorAmount = String(input.floorAmount);
    var floorHeight = String(input.floorHeight);
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
            amount: (1/9) * parseFloat(surface),
            unitType: materialFoundationType.unitType,
            total: (1/9) * parseFloat(surface) * 0.40 * 0.40 * foundationDepth,
            value:  (1/9) * parseFloat(surface) * 0.40 * 0.40 * foundationDepth * materialFoundationType.pricePerUnit
        },
        foundationBeams: {
            name: 'Funderingsbalken',
            material: materialFoundationType.materialName,
            amount: (1/6) * parseFloat(length) + 4,
            unitType: materialFoundationType.unitType,
            total: ((1/6) * parseFloat(length) * 0.40 * 0.60 * parseFloat(width)) + (length * 2) + (width * 2),
            value: (1/6) * parseFloat(length) * 0.40 * 0.60 * parseFloat(width) * materialFoundationType.pricePerUnit
        },
        supportType: {
            name: 'Constructie',
            material: materialSupportType.materialName,
            amount: 1,
            unitType: materialSupportType.unitType,
            total: formulaSupportType.factor * parseFloat(surface),
            value: formulaSupportType.factor * parseFloat(surface) * materialSupportType.pricePerUnit
        }
    }
    residualValue['total'] = { value: (residualValue.foundationPikes.total + residualValue.foundationBeams.total + residualValue.supportType.total) }

    return residualValue;
}

module.exports = { calculateResidualValue }