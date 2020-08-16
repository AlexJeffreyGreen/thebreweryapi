const mongoose = require('mongoose');

const hopSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: '{PATH} is required!'
    },
    alpha_acids:{
        type: mongoose.Schema.Types.Decimal128
    },
    beta_acids:{
        type: mongoose.Schema.Types.Decimal128
    },
    manufacturerid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Manufacturer' 
      }
  }, {
    timestamps: true
  });


  module.exports = mongoose.model('Hop', hopSchema);