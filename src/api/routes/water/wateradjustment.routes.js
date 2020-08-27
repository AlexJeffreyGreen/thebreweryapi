module.exports = (app) => {
    const wateradjustment = require('../../controllers/water/wateradjustment.controller.js');
    const apiUrl = "/api/v1";

    app.post(`${apiUrl}/wateradjustment`, wateradjustment.create);

    app.get(`${apiUrl}/wateradjustment`, wateradjustment.findAll);

    app.get(`${apiUrl}/wateradjustment/:wateradjustmentId`, wateradjustment.findOne);

    app.put(`${apiUrl}/wateradjustment/:wateradjustmentId`, wateradjustment.update);

    app.delete(`${apiUrl}/wateradjustment/:wateradjustmentId`, wateradjustment.delete);
}