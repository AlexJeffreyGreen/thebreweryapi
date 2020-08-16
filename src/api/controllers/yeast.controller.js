const Yeast = require('../models/yeast.model.js');
const Manufacturer = require('../models/manufacturer.model.js');

// Create and Save a new yeast
exports.create = async (req, res) => {
    // Validate request
    console.log(req.body);
    //console.log(res);
    if(!req.body.name || !req.body.manufacturerid) {
        return res.status(400).send({
            message: "yeast name OR company can not be empty"
        });
    }
    const yeast = new Yeast({
        name: req.body.name || "Untitled yeast", 
        flocculation: req.body.flocculation,
        attenuation: req.body.attenuation,
        manufacturerid: req.body.manufacturerid
    });

    // Save yeast in the database
    yeast.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the yeast."
        });
    });

    //lookupCompany.yeasts.push(yeast);
    //await lookupCompany.save();
};

// Retrieve and return all yeast from the database.
exports.findAll = (req, res) => {
    Yeast.find()
    .then(yeast => {
        res.send(yeast);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving yeast."
        });
    });
};

// Find a single yeast with a yeastId
exports.findOne = (req, res) => {
    Yeast.findById(req.params.yeastId)
    .then(yeast => {
        if(!yeast) {
            return res.status(404).send({
                message: "yeast not found with id " + req.params.yeastId
            });            
        }
        res.send(yeast);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "yeast not found with id " + req.params.yeastId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving yeast with id " + req.params.yeastId
        });
    });
};

// Update a yeast identified by the yeastId in the request
exports.update = async (req, res) => {
    // Validate Request
    if(!req.body.name || !req.body.yeast_companyid) {
        return res.status(400).send({
            message: "yeast content can not be empty"
        });
    }
    lookupCompany = await Manufacturer.findById(req.body.manufacturerid);
    // console.log(lookupCompany.name);
    // console.log(lookupCompany._id);
    // Find yeast and update it with the request body
    Yeast.findByIdAndUpdate(req.params.yeastId, {
        name: req.body.name || "Untitled yeast",
        flocculation: req.body.flocculation,
        attenuation: req.body.attenuation,
        manufacturerid: req.body.manufacturerid
    }, {new: true})
    .then(yeast => {
        if(!yeast) {
            return res.status(404).send({
                message: "yeast not found with id " + req.params.yeastId
            });
        }
        res.send(yeast);
        lookupCompany.yeasts.push(yeast);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "yeast not found with id " + req.params.yeastId
            });                
        }
        return res.status(500).send({
            message: "Error updating yeast with id " + req.params.yeastId
        });
    });

   
};

// Delete a yeast with the specified yeastId in the request
exports.delete = (req, res) => {
    Yeast.findByIdAndRemove(req.params.yeastId)
    .then(yeast => {
        if(!yeast) {
            return res.status(404).send({
                message: "yeast not found with id " + req.params.yeastId
            });
        }
        res.send({message: "yeast deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "yeast not found with id " + req.params.yeastId
            });                
        }
        return res.status(500).send({
            message: "Could not delete yeast with id " + req.params.yeastId
        });
    });
};