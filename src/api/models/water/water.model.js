const mongoose = require('mongoose');

const waterSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: '{PATH} is required!'
    },
    price_per_unit:{
        type: mongoose.Schema.Types.Decimal128
    },
    watertypeid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WaterType'
    }
}, {
        timestamps: true
});
module.exports = mongoose.model('Water', waterSchema);