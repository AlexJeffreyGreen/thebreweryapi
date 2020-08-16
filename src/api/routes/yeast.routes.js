module.exports = (app) => {
    const yeast = require('../controllers/yeast.controller.js');
    const apiUrl = "/api/v1";
    // Create a new Note
    app.post(`${apiUrl}/yeast`, yeast.create);

    // Retrieve all Notes
    app.get(`${apiUrl}/yeast`, yeast.findAll);

    // Retrieve a single Note with noteId
    app.get(`${apiUrl}/yeast/:yeastId`, yeast.findOne);

    // Update a Note with noteId
    app.put(`${apiUrl}/yeast/:yeastId`, yeast.update);

    // Delete a Note with noteId
    app.delete(`${apiUrl}/yeast/:yeastId`, yeast.delete);
}