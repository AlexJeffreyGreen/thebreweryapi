const mongoose = require('mongoose');

const waterSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: '{PATH} is required!'
    },
    watertypeid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WaterType'
    }
}, {
        timestamps: true
});
module.exports = mongoose.model('Water', waterSchema);