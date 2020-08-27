// name: { 
//     type: String, 
//     required: '{PATH} is required!'
// },
// price_per_unit:{
//     type: mongoose.Schema.Types.Decimal128
// },
// waterId:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Water'
// }

const WaterType = require('../../models/water/watertype.model');
const Water = require('../../models/water/water.model');
// Create and Save a new Water
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    //console.log(res);
    if(!req.body.name) {
        return res.status(400).send({
            message: "Water name can not be empty"
        });
    }

    // Create a Water
    const water = new Water({
        name: req.body.name || "Untitled Water", 
        watertypeid: req.body.watertypeid
    });

    // Save Water in the database
    water.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Water."
        });
    });
};

// Retrieve and return all Water from the database.
exports.findAll = (req, res) => {
    Water.find()
    .then(Water => {
        res.send(Water);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Water."
        });
    });
};

// Find a single Water with a waterId
exports.findOne = (req, res) => {
    Water.findById(req.params.waterId)
    .then(water => {
        if(!water) {
            return res.status(404).send({
                message: "Water not found with id " + req.params.waterId
            });            
        }
        res.send(water);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Water not found with id " + req.params.waterId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Water with id " + req.params.waterId
        });
    });
};

// Update a Water identified by the waterId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Water name can not be empty"
        });
    }

    // Find Water and update it with the request body
    Water.findByIdAndUpdate(req.params.waterId, {
        name: req.body.name || "Untitled Water", 
        watertypeid: req.body.watertypeid
    }, {new: true})
    .then(water => {
        if(!water) {
            return res.status(404).send({
                message: "Water not found with id " + req.params.waterId
            });
        }
        res.send(water);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Water not found with id " + req.params.waterId
            });                
        }
        return res.status(500).send({
            message: "Error updating Water with id " + req.params.waterId
        });
    });
};

// Delete a Water with the specified waterId in the request
exports.delete = (req, res) => {
    Water.findByIdAndRemove(req.params.waterId)
    .then(water => {
        if(!water) {
            return res.status(404).send({
                message: "Water not found with id " + req.params.waterId
            });
        }
        res.send({message: "Water deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Water not found with id " + req.params.waterId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Water with id " + req.params.waterId
        });
    });
};