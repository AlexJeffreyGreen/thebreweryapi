const Adjunct = require('../models/adjunct.model.js');
const Manufacturer = require('../models/manufacturer.model');

// Create and Save a new adjunct
exports.create = async (req, res) => {
    // Validate request
    console.log(req.body);
    //console.log(res);
    if(!req.body.name || !req.body.manufacturerid) {
        return res.status(400).send({
            message: "adjunct name OR manufacturer can not be empty"
        });
    }
    const lookupCompany = await Manufacturer.findById(req.body.manufacturerid)
    //console.log("logging async company: " + lookupCompany._id);
   // // .then(yC => console.log("adjunctC: " + yC._id));
    // Create a adjunct
    //console.log(lookupCompany._id);
    const adjunct = new Adjunct({
        name: req.body.name || "Untitled adjunct",
        manufacturerid: lookupCompany._id
    });

    // Save adjunct in the database
    adjunct.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the adjunct."
        });
    });

    //lookupCompany.adjuncts.push(adjunct);
    //await lookupCompany.save();
};

// Retrieve and return all adjunct from the database.
exports.findAll = (req, res) => {
    Adjunct.find()
    .then(adjunct => {
        res.send(adjunct);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving adjunct."
        });
    });
};

// Find a single adjunct with a adjunctId
exports.findOne = (req, res) => {
    Adjunct.findById(req.params.adjunctId)
    .then(adjunct => {
        if(!adjunct) {
            return res.status(404).send({
                message: "adjunct not found with id " + req.params.adjunctId
            });            
        }
        res.send(adjunct);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "adjunct not found with id " + req.params.adjunctId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving adjunct with id " + req.params.adjunctId
        });
    });
};

// Update a adjunct identified by the adjunctId in the request
exports.update = async (req, res) => {
    // Validate Request
    if(!req.body.name || !req.params.adjunctId) {
        return res.status(400).send({
            message: "adjunct name OR Id can not be empty"
        });
    }
    lookupCompany = await Manufacturer.findById(req.body.manufacturerid);
    //console.log(lookupCompany.name);
    //console.log(lookupCompany._id);
    // Find adjunct and update it with the request body
    Adjunct.findByIdAndUpdate(req.params.adjunctId, {
        name: req.body.name || "Untitled adjunct", 
        manufacturerid: lookupCompany._id
    }, {new: true})
    .then(adjunct => {
        if(!adjunct) {
            return res.status(404).send({
                message: "adjunct not found with id " + req.params.adjunctId
            });
        }
        res.send(adjunct);
        //lookupCompany.adjuncts.push(adjunct);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "adjunct not found with id " + req.params.adjunctId
            });                
        }
        return res.status(500).send({
            message: "Error updating adjunct with id " + req.params.adjunctId
        });
    });

   
};

// Delete a adjunct with the specified adjunctId in the request
exports.delete = (req, res) => {
    Adjunct.findByIdAndRemove(req.params.adjunctId)
    .then(adjunct => {
        if(!adjunct) {
            return res.status(404).send({
                message: "adjunct not found with id " + req.params.adjunctId
            });
        }
        res.send({message: "adjunct deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "adjunct not found with id " + req.params.adjunctId
            });                
        }
        return res.status(500).send({
            message: "Could not delete adjunct with id " + req.params.adjunctId
        });
    });
};