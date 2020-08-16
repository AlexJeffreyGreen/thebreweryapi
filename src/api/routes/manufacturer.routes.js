module.exports = (app) => {
    const manufacturer = require('../controllers/manufacturer.controller.js');
    const apiUrl = "/api/v1";

    app.post(`${apiUrl}/manufacturer`, manufacturer.create);

    app.get(`${apiUrl}/manufacturer`, manufacturer.findAll);

    app.get(`${apiUrl}/manufacturer/:manufacturerId`, manufacturer.findOne);

    app.put(`${apiUrl}/manufacturer/:manufacturerId`, manufacturer.update);

    app.delete(`${apiUrl}/manufacturer/:manufacturerId`, manufacturer.delete);
}