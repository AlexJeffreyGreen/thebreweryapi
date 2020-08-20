const Grain = require('../models/grain.model.js');
const Manufacturer = require('../models/manufacturer.model');

// Create and Save a new grain
exports.create = async (req, res) => {
    // Validate request
    console.log(req.body);
    //console.log(res);
    if(!req.body.name || !req.body.manufacturerid) {
        return res.status(400).send({
            message: "grain name OR manufacturer can not be empty"
        });
    }
    const lookupCompany = await Manufacturer.findById(req.body.manufacturerid)
    //console.log("logging async company: " + lookupCompany._id);
   // // .then(yC => console.log("grainC: " + yC._id));
    // Create a grain
    //console.log(lookupCompany._id);
    const grain = new Grain({
        name: req.body.name || "Untitled grain", 
        is_adjunct: req.body.is_adjunct,
        is_basemalt: req.body.is_basemalt,
        is_extract: req.body.is_extract,
        manufacturerid: lookupCompany._id
    });

    // Save grain in the database
    grain.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the grain."
        });
    });

    //lookupCompany.grains.push(grain);
    //await lookupCompany.save();
};

// Retrieve and return all grain from the database.
exports.findAll = (req, res) => {
    Grain.find()
    .then(grain => {
        res.send(grain);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving grain."
        });
    });
};

// Find a single grain with a grainId
exports.findOne = (req, res) => {
    Grain.findById(req.params.grainId)
    .then(grain => {
        if(!grain) {
            return res.status(404).send({
                message: "grain not found with id " + req.params.grainId
            });            
        }
        res.send(grain);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "grain not found with id " + req.params.grainId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving grain with id " + req.params.grainId
        });
    });
};

// Update a grain identified by the grainId in the request
exports.update = async (req, res) => {
    // Validate Request
    if(!req.body.name || !req.params.grainId) {
        return res.status(400).send({
            message: "grain name OR Id can not be empty"
        });
    }
    lookupCompany = await Manufacturer.findById(req.body.grain_companyid);
    //console.log(lookupCompany.name);
    //console.log(lookupCompany._id);
    // Find grain and update it with the request body
    Grain.findByIdAndUpdate(req.params.grainId, {
        name: req.body.name || "Untitled grain", 
        is_adjunct: req.body.is_adjunct,
        is_basemalt: req.body.is_basemalt,
        is_extract: req.body.is_extract,
        manufacturerid: lookupCompany._id
    }, {new: true})
    .then(grain => {
        if(!grain) {
            return res.status(404).send({
                message: "grain not found with id " + req.params.grainId
            });
        }
        res.send(grain);
        //lookupCompany.grains.push(grain);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "grain not found with id " + req.params.grainId
            });                
        }
        return res.status(500).send({
            message: "Error updating grain with id " + req.params.grainId
        });
    });

   
};

// Delete a grain with the specified grainId in the request
exports.delete = (req, res) => {
    Grain.findByIdAndRemove(req.params.grainId)
    .then(grain => {
        if(!grain) {
            return res.status(404).send({
                message: "grain not found with id " + req.params.grainId
            });
        }
        res.send({message: "grain deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "grain not found with id " + req.params.grainId
            });                
        }
        return res.status(500).send({
            message: "Could not delete grain with id " + req.params.grainId
        });
    });
};