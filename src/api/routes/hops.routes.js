module.exports = (app) => {
    const hops = require('../controllers/hops.controller.js');
    const apiUrl = "/api/v1";

    app.post(`${apiUrl}/hops`, hops.create);

    app.get(`${apiUrl}/hops`, hops.findAll);

    app.get(`${apiUrl}/hops/:hopsId`, hops.findOne);

    app.put(`${apiUrl}/hops/:hopsId`, hops.update);

    app.delete(`${apiUrl}/hops/:hopsId`, hops.delete);
}