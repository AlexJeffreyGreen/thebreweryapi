const mongoose = require("mongoose");

const adjunctSchema = mongoose.Schema(
  {
      name:{
          type: String,
          required: '{PATH} is required!'
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

module.exports = mongoose.model('Adjunct', adjunctSchema);