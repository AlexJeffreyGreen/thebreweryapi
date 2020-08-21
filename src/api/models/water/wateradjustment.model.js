const mongoose = require('mongoose');

const waterAdjustmentSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: '{PATH} is required!'
    },
    parts_per_million:{
        type: mongoose.Schema.Types.Decimal128
    },
    amount_in_grams:{
        type:mongoose.Schema.Types.Decimal128
    },
    waterid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Water'
    }
}, {
        timestamps: true
});

module.exports = mongoose.model('WaterAdjustment', waterAdjustmentSchema);