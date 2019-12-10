const express = require('express');

// Create express app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Parse requests of content-type - application/json
app.use(express.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Listen for requests
app.listen(3001, 'localhost', () => {
    console.log("Server is listening on port 3001");
});

// Define root route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to SmartTapp API!",
        "documentation": "https://github.com/Grunkhead/rest"
    });
});

// Only accept application/json and application/x-www-form-urlencoded
app.use(function (req, res, next) {
    if (req.accepts(['application/json', 'application/x-www-form-urlencoded'])) {
        next()
    } else {
        res.status(406).send({
            error: "We only accept application/json & application/x-www-form-urlencoded."
        })
    }
})

// Require routing files
require('./app/routes/tap.routes.js')(app);