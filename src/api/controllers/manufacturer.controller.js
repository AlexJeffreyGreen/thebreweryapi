const Manufacturer = require('../models/manufacturer.model.js');

// Create and Save a new manufacturer
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    //console.log(res);
    if(!req.body.name) {
        return res.status(400).send({
            message: "manufacturer name can not be empty"
        });
    }

    // Create a manufacturer
    const manufacturer = new Manufacturer({
        name: req.body.name || "Untitled manufacturer", 
        location: req.body.location
    });

    // Save manufacturer in the database
    manufacturer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the manufacturer."
        });
    });
};

// Retrieve and return all manufacturer from the database.
exports.findAll = (req, res) => {
    Manufacturer.find()
    .then(manufacturer => {
        res.send(manufacturer);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving manufacturer."
        });
    });
};

// Find a single manufacturer with a manufacturerId
exports.findOne = (req, res) => {
    Manufacturer.findById(req.params.manufacturerId)
    .then(manufacturer => {
        if(!manufacturer) {
            return res.status(404).send({
                message: "manufacturer not found with id " + req.params.manufacturerId
            });            
        }
        res.send(manufacturer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "manufacturer not found with id " + req.params.manufacturerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving manufacturer with id " + req.params.manufacturerId
        });
    });
};

// Update a manufacturer identified by the manufacturerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "manufacturer name can not be empty"
        });
    }

    // Find manufacturer and update it with the request body
    Manufacturer.findByIdAndUpdate(req.params.manufacturerId, {
        name: req.body.name || "Untitled manufacturer",
        location: req.body.location
    }, {new: true})
    .then(manufacturer => {
        if(!manufacturer) {
            return res.status(404).send({
                message: "manufacturer not found with id " + req.params.manufacturerId
            });
        }
        res.send(manufacturer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "manufacturer not found with id " + req.params.manufacturerId
            });                
        }
        return res.status(500).send({
            message: "Error updating manufacturer with id " + req.params.manufacturerId
        });
    });
};

// Delete a manufacturer with the specified manufacturerId in the request
exports.delete = (req, res) => {
    Manufacturer.findByIdAndRemove(req.params.manufacturerId)
    .then(manufacturer => {
        if(!manufacturer) {
            return res.status(404).send({
                message: "manufacturer not found with id " + req.params.manufacturerId
            });
        }
        res.send({message: "manufacturer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "manufacturer not found with id " + req.params.manufacturerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete manufacturer with id " + req.params.manufacturerId
        });
    });
};