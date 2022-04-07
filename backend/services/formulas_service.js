//Import corresponding DAO functions from Repository layer.
const { getFormulas, getFormulaByName } = require('../repositories/formula_dao.js');

async function getFormula(name) {

    var formula = await getFormulaByName(name);  

    return formula;
}

module.exports = { getFormula }