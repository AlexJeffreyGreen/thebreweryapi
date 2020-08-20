module.exports = (app) => {
    const adjunct = require('../controllers/adjunct.controller.js');
    const apiUrl = "/api/v1";
    // Create a new Note
    app.post(`${apiUrl}/adjunct`, adjunct.create);

    // Retrieve all Notes
    app.get(`${apiUrl}/adjunct`, adjunct.findAll);

    // Retrieve a single Note with noteId
    app.get(`${apiUrl}/adjunct/:adjunctId`, adjunct.findOne);

    // Update a Note with noteId
    app.put(`${apiUrl}/adjunct/:adjunctId`, adjunct.update);

    // Delete a Note with noteId
    app.delete(`${apiUrl}/adjunct/:adjunctId`, adjunct.delete);
}