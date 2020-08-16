const mongoose = require('mongoose');

const yeastSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: '{PATH} is required!'
    },
    flocculation: {
        type: mongoose.Schema.Types.Decimal128
    },
    attenuation:{
        type: mongoose.Schema.Types.Decimal128
    },
    manufacturerid: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Manufacturer' 
    }
  }, {
    timestamps: true
  });


  module.exports = mongoose.model('Yeast', yeastSchema);