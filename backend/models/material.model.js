const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  name: { 
      type: String, 
      required: true,
      trim: true,
  },
  weight: {
    type: Number,
    required: true,
    trim: true
  },
  value: {
    type: Number,
    required: true,
    trim: true
  }
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;