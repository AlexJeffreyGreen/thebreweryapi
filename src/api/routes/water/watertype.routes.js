module.exports = (app) => {
    const watertype = require('../../controllers/water/watertype.controller.js');
    const apiUrl = "/api/v1";

    app.post(`${apiUrl}/watertype`, watertype.create);

    app.get(`${apiUrl}/watertype`, watertype.findAll);

    app.get(`${apiUrl}/watertype/:watertypeId`, watertype.findOne);

    app.put(`${apiUrl}/watertype/:watertypeId`, watertype.update);

    app.delete(`${apiUrl}/watertype/:watertypeId`, watertype.delete);
}