let Formula = require('../models/formula.model');

async function getFormulas() {

}

async function getFormulaByName(formulaName) {
    try{
        let formula = await Formula.findOne({ name: formulaName}).lean()
        return formula;
    } catch (err) {
        console.log(err) 
    }
}

module.exports = { getFormulas, getFormulaByName }