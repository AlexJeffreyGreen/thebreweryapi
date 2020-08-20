const mongoose = require("mongoose");

const grainSchema = mongoose.Schema(
  {
      name:{
          type: String,
          required: '{PATH} is required!'
      },
      is_basemalt:{
          type: mongoose.Schema.Types.Boolean
      },
      is_extract:{
          type: mongoose.Schema.Types.Boolean
      },
      manufacturerid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Manufacturer' 
      }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Grain', grainSchema);