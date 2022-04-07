const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formulaSchema = new Schema({
  name: { 
      type: String, 
      required: true,
      trim: true,
  },
  factorType: { 
      type: String, 
      required: true,
      trim: true,
  },
  factor: {
      type: Number, 
      required: true,
      trim: true,
  }
});

const Formula = mongoose.model('Formula', formulaSchema);

module.exports = Formula;