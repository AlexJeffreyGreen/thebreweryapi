const mongoose = require('mongoose');

const manufacturerSchema =  mongoose.Schema(
    {
        name: { 
            type: String, 
            required: '{PATH} is required!'
        },
        location: {
            type: String
        },
        website: {
            type: String
        }
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model('Manufacturer', manufacturerSchema);