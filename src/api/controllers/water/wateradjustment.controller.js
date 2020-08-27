const WaterAdjustment = require('../../models/water/wateradjustment.model');
const Water = require('../../models/water/water.model');

exports.create = (req, res) => {
    if(!req.body.name ||
        !req.body.waterid) {
            return res.status(400).send({
                message: "Name AND Water Id are required."
            });
    }

    const waterAdjustment = new WaterAdjustment({
        name: req.body.name,
        parts_per_million: req.body.parts_per_million,
        amount_in_grams: req.body.amount_in_grams,
        waterid: req.body.waterid
    });

    waterAdjustment.save()
        .then(data =>{
            res.send(data);
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "Some error occurred while parsing your request."
            })
        });
};

exports.findAll = (req, res) => {
    WaterAdjustment.find()
        .then(waterAdjustment=> {
            res.send(waterAdjustment);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while parsing your request."
            });
        });
};

exports.findOne = (req, res) => {
    WaterAdjustment.findById(req.params.wateradjustmentId)
        .then(waterAdjustment => {
            if(!waterAdjustment){
                return res.status(404).send({
                    message: "water adjustmnet not found with id " + req.params.wateradjustmentId
                });
            }
            res.send(waterAdjustment);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "water adjustment not found with id " + req.params.wateradjustmentId
                });
            }
            return res.status(500).send({
                message: "Error Retrieving water adjustment with id " + req.params.wateradjustmentId
            });
        });
};

exports.update = (req, res) => {
    if(!req.body.name || !req.params.wateradjustmentId){
        return res.status(400).send({
            message: "Water adjustment id or name can not be empty"
        });
    }

    WaterAdjustment.findByIdAndUpdate(req.params.wateradjustmentId, {
        name: req.body.name,
        parts_per_million: req.body.parts_per_million,
        amount_in_grams: req.body.amount_in_grams,
        waterid: req.body.waterid
    }, {new: true})
        .then(wateradjustment => {
            if(!wateradjustment){
                return res.status(404).send({
                    message: "water adjustmnet not found with id " + req.params.wateradjustmentId
                });
            }
            res.send(wateradjustment);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "water adjustment not found with id " + req.params.wateradjustmentId
                });                
            }
            return res.status(500).send({
                message: "Error updating water adjustment with id " + req.params.wateradjustmentId + err
            });
        });
};

exports.delete = (req, res) => {
    WaterAdjustment.findByIdAndRemove(req.params.wateradjustmentId)
    .then(wateradjustment => {
        if(!wateradjustment) {
            return res.status(404).send({
                message: "water adjustmnet not found with id " + req.params.wateradjustmentId
            });
        }
        res.send({message: "water adjustment deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "water adjustment not found with id " + req.params.wateradjustmnetid
            });                
        }
        return res.status(500).send({
            message: "Could not delete water adjustmnet with id " + req.params.wateradjustmnetid
        });
    });
};