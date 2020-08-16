const Hops = require('../models/hops.model.js');
const Manufacturer = require('../models/manufacturer.model');

// Create and Save a new hops
exports.create = async (req, res) => {
    // Validate request
    console.log(req.body);
    //console.log(res);
    if(!req.body.name || !req.body.manufacturerid) {
        return res.status(400).send({
            message: "hops name OR manufacturer can not be empty"
        });
    }
    const lookupCompany = await Manufacturer.findById(req.body.manufacturerid)
    //console.log("logging async company: " + lookupCompany._id);
   // // .then(yC => console.log("hopsC: " + yC._id));
    // Create a hops
    //console.log(lookupCompany._id);
    const hops = new Hops({
        name: req.body.name || "Untitled hops", 
        is_adjunct: req.body.is_adjunct,
        is_basemalt: req.body.is_basemalt,
        is_extract: req.body.is_extract,
        manufacturerid: lookupCompany._id
    });

    // Save hops in the database
    hops.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the hops."
        });
    });

    //lookupCompany.hopss.push(hops);
    //await lookupCompany.save();
};

// Retrieve and return all hops from the database.
exports.findAll = (req, res) => {
    Hops.find()
    .then(hops => {
        res.send(hops);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving hops."
        });
    });
};

// Find a single hops with a hopsId
exports.findOne = (req, res) => {
    Hops.findById(req.params.hopsId)
    .then(hops => {
        if(!hops) {
            return res.status(404).send({
                message: "hops not found with id " + req.params.hopsId
            });            
        }
        res.send(hops);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "hops not found with id " + req.params.hopsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving hops with id " + req.params.hopsId
        });
    });
};

// Update a hops identified by the hopsId in the request
exports.update = async (req, res) => {
    // Validate Request
    if(!req.body.name || !req.params.hopsId) {
        return res.status(400).send({
            message: "hops name OR Id can not be empty"
        });
    }
    lookupCompany = await Manufacturer.findById(req.body.manufacturerid);
    //console.log(lookupCompany.name);
    //console.log(lookupCompany._id);
    // Find hops and update it with the request body
    Hops.findByIdAndUpdate(req.params.hopsId, {
        name: req.body.name || "Untitled hops", 
        is_adjunct: req.body.is_adjunct,
        is_basemalt: req.body.is_basemalt,
        is_extract: req.body.is_extract,
        hops_companyid: lookupCompany._id
    }, {new: true})
    .then(hops => {
        if(!hops) {
            return res.status(404).send({
                message: "hops not found with id " + req.params.hopsId
            });
        }
        res.send(hops);
        //lookupCompany.hopss.push(hops);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "hops not found with id " + req.params.hopsId
            });                
        }
        return res.status(500).send({
            message: "Error updating hops with id " + req.params.hopsId
        });
    });

   
};

// Delete a hops with the specified hopsId in the request
exports.delete = (req, res) => {
    Hops.findByIdAndRemove(req.params.hopsId)
    .then(hops => {
        if(!hops) {
            return res.status(404).send({
                message: "hops not found with id " + req.params.hopsId
            });
        }
        res.send({message: "hops deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "hops not found with id " + req.params.hopsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete hops with id " + req.params.hopsId
        });
    });
};