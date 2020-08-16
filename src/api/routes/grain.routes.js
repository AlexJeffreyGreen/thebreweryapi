module.exports = (app) => {
    const grain = require('../controllers/grain.controller.js');
    const apiUrl = "/api/v1";
    // Create a new Note
    app.post(`${apiUrl}/grain`, grain.create);

    // Retrieve all Notes
    app.get(`${apiUrl}/grain`, grain.findAll);

    // Retrieve a single Note with noteId
    app.get(`${apiUrl}/grain/:grainId`, grain.findOne);

    // Update a Note with noteId
    app.put(`${apiUrl}/grain/:grainId`, grain.update);

    // Delete a Note with noteId
    app.delete(`${apiUrl}/grain/:grainId`, grain.delete);
}