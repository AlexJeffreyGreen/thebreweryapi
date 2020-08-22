const WaterType = require('../../models/water/watertype.model');

// Create and Save a new watertype
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    //console.log(res);
    if(!req.body.name) {
        return res.status(400).send({
            message: "watertype name can not be empty"
        });
    }

    // Create a watertype
    const watertype = new WaterType({
        name: req.body.name || "Untitled watertype", 
        location: req.body.location
    });

    // Save watertype in the database
    watertype.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the watertype."
        });
    });
};

// Retrieve and return all watertype from the database.
exports.findAll = (req, res) => {
    WaterType.find()
    .then(watertype => {
        res.send(watertype);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving watertype."
        });
    });
};

// Find a single watertype with a watertypeId
exports.findOne = (req, res) => {
    WaterType.findById(req.params.watertypeId)
    .then(watertype => {
        if(!watertype) {
            return res.status(404).send({
                message: "watertype not found with id " + req.params.watertypeId
            });            
        }
        res.send(watertype);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "watertype not found with id " + req.params.watertypeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving watertype with id " + req.params.watertypeId
        });
    });
};

// Update a watertype identified by the watertypeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "watertype name can not be empty"
        });
    }

    // Find watertype and update it with the request body
    WaterType.findByIdAndUpdate(req.params.watertypeId, {
        name: req.body.name || "Untitled watertype",
        location: req.body.location
    }, {new: true})
    .then(watertype => {
        if(!watertype) {
            return res.status(404).send({
                message: "watertype not found with id " + req.params.watertypeId
            });
        }
        res.send(watertype);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "watertype not found with id " + req.params.watertypeId
            });                
        }
        return res.status(500).send({
            message: "Error updating watertype with id " + req.params.watertypeId
        });
    });
};

// Delete a watertype with the specified watertypeId in the request
exports.delete = (req, res) => {
    WaterType.findByIdAndRemove(req.params.watertypeId)
    .then(watertype => {
        if(!watertype) {
            return res.status(404).send({
                message: "watertype not found with id " + req.params.watertypeId
            });
        }
        res.send({message: "watertype deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "watertype not found with id " + req.params.watertypeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete watertype with id " + req.params.watertypeId
        });
    });
};