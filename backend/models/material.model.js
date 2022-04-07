const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  name: { 
      type: String, 
      required: true,
      trim: true,
  },
  componentName: { 
      type: String, 
      required: true,
      trim: true,
  },
  labelName: { 
    type: String, 
    required: true,
    trim: true,
  },
  materialName: {
    type: String,
    required: true,
    trim: true,
  },
  unitType: {
      type: String, 
      required: true,
      trim: true,
  },
  pricePerUnit: {
      type: Number, 
      required: true,
      trim: true,
  }
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;