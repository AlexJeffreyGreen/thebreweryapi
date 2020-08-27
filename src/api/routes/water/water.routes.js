module.exports = (app) => {
    const water = require('../../controllers/water/water.controller.js');
    const apiUrl = "/api/v1";

    app.post(`${apiUrl}/water`, water.create);

    app.get(`${apiUrl}/water`, water.findAll);

    app.get(`${apiUrl}/water/:waterId`, water.findOne);

    app.put(`${apiUrl}/water/:waterId`, water.update);

    app.delete(`${apiUrl}/water/:waterId`, water.delete);
}