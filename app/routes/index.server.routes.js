// Load the 'index' controller
const index = require('../controllers/index.server.controllers');


// Define the routes module' method
module.exports = function (app) {

    // Mount the 'index' controller's 'render' method
    app.post('/', index.render);
    //
    // app.get('/', index.render);
    //
    app.get('/sum', index.render);
    app.get('/', function (req, res) {

        res.render('index');
    });

    //
};