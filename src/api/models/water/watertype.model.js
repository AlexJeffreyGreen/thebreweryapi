const mongoose = require('mongoose');

const waterTypeSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: '{PATH} is required!'
    },
    type:{
        type: String
    },
    price_per_unit:{
        type: mongoose.Schema.Types.Decimal128
    },
    location:{
        type: String
    }
}, {
        timestamps: true
});

module.exports = mongoose.model('WaterType', waterTypeSchema);