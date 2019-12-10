module.exports = (app) => {
    const tap = require('../controllers/tap.controller.js');
    
    // Create a new tap
    app.post('/taps', tap.create);

    // Update a tap by sending all properties
    app.put('/taps/:tapId', tap.update);

    // Update a tap by sending the properties that you only want to update
    app.patch('/taps/:tapId', tap.update);

    // Retrieve all taps
    app.get('/taps', tap.findAll);

    // Retrieve all taps, paginated
    app.get('/taps/page/:pageNumber', tap.findAllPaginated);

    // Retrieve a single tap
    app.get('/taps/:tapId', tap.findOne);

    // Delete a tap with tapId
    app.delete('/taps/:tapId', tap.delete);

    // Retrieve options for taps resource
    app.options('/taps', function(req, res) {
        let headers = {};

        headers['Access-Control-Allow-Origin'] = '*';
        headers['Content-Type'] = 'Content-Type', 'application/json';
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
        headers['Allow'] = 'GET, POST, OPTIONS';
        headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
        headers['Content-Length'] = '0';
        headers["Access-Control-Max-Age"] = '86400';

        res.writeHead(200, headers);
        res.send();
    });

    // Retrieve options for taps detail resource
    app.options('/taps/:tapId', function(req, res) {
        let headers = {};

        headers['Access-Control-Allow-Origin'] = '*';
        headers['Content-Type'] = 'Content-Type', 'text/html; charset=UTF-8';
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
        headers['Allow'] = 'GET, PUT, DELETE, OPTIONS';
        headers['Access-Control-Allow-Methods'] = 'GET, PUT, DELETE, OPTIONS';
        headers['Content-Length'] = '0';
        headers["Access-Control-Max-Age"] = '86400';
        
        res.writeHead(200, headers);
        res.send();          
    })
}
