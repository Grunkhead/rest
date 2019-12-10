const Tap = require('../models/tap.model.js');

// Returns object with attributes which have errors.
function tapValid(req) {
    let errors = {};

    if (!req.body.name) errors.name = 'Attribute name is empty.'
    if (!req.body.description) errors.description = 'Attribute description is empty.'
    if (!req.body.something) errors.something = 'Attribute something is empty.'

    return Object.keys(errors).length
}

// Create and Save a new Tap
exports.create = (req, res) => {

    // Check if errors is empty, then throw error.
    if (tapValid(req)) res.status(404).send(errors);

    // Create a Tap
    const tap = new Tap({
        name: req.body.name,
        description: req.body.name,
        something: req.body.name
    });

    // Save Tap in the database
    tap.save().then(data => {
            res.status(201).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err
            });
        });
};

// Retrieve and return all taps from the database.
exports.findAll = (req, res) => {
    Tap.find()
        .then(taps => {

            res.send({
                "items": taps,
                "_links": {
                    "self": {
                        "href": 'http://145.24.222.249/taps'
                    }
                },
                "pagination": {
                    "currentpage": 1,
                    "currentItems": 3,
                    "totalPages": "",
                    "totalItems": "",
                    "_links": {
                        "first": {
                            "page": "http://145.24.222.249/taps",
                            "href": "http://145.24.222.249/taps/page/1"
                        },
                        "last": {
                            "page": "http://145.24.222.249/taps",
                            "href": "http://145.24.222.249/taps/page/1"
                        },
                        "previous": {
                            "page": "http://145.24.222.249/taps",
                            "href": `http://145.24.222.249/taps/page/1`
                        },
                        "next": {
                            "page": "http://145.24.222.249/taps",
                            "href": `http://145.24.222.249/taps/page/2`
                        }
                    }
                }
            });
            res.body
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving taps."
            });
        });
}

// Retrieve and return all taps paginated from the database.
exports.findAllPaginated = (req, res) => {
    var page = Math.max(0, req.param('pageNumber'));
    var perPage = 3;
    var totalItems = Tap.estimatedDocumentCount().exec().then((data) => { return data; });
    
    if (page < 1) page++;

    Tap.find()
        .select('name')
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            name: 'asc'
        })
        .then(taps => {
            res.send({
                "items": taps,
                "_links": {
                    "self": {
                        "href": "http://145.24.222.249/taps"
                    }
                },
                "pagination": {
                    "currentpage": page,
                    "currentItems": perPage,
                    "totalPages": "",
                    "totalItems": totalItems,
                    "_links": {
                        "first": {
                            "page": "http://145.24.222.249/taps",
                            "href": "http://145.24.222.249/taps/page/1"
                        },
                        "last": {
                            "page": "http://145.24.222.249/taps",
                            "href": "http://145.24.222.249/taps/page/1"
                        },
                        "previous": {
                            "page": "http://145.24.222.249/taps",
                            "href": `http://145.24.222.249/taps/page/${page--}`
                        },
                        "next": {
                            "page": "http://145.24.222.249/taps",
                            "href": `http://145.24.222.249/taps/page/${page++}`
                        }
                    }
                }
            });
            
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving taps."
            });
        });
};

// Find a single tap with a tapId
exports.findOne = (req, res) => {
    Tap.findById(req.params.tapId)
        .then(tap => {
            if (!tap) {
                return res.status(404).send({
                    message: "Tap not found with id " + req.params.tapId
                });
            }
            res.status(200).send(tap);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Tap not found with id " + req.params.tapId
                });
            }
            return res.status(500).send({
                message: "Error retrieving tap with id " + req.params.tapId
            });
        });
};

// Update a tap identified by the tapId in the request
exports.update = (req, res) => {
 // Check if errors is empty, then throw error.
 if (tapValid(req)) res.status(404).send(errors);

 // Find tap and update it with the request body
 Tap.findByIdAndUpdate(req.params.tapId, {
         name: req.body.name,
         description: req.body.description,
         something: req.body.something
     }, {
         // Gets the newest version of the document
         new: true
     })
     .then(tap => {
         if (!tap) {
             return res.status(404).send({
                 message: "Tap not found with id " + req.params.tapId
             });
         }
         res.send(tap);
     }).catch(err => {
         if (err.kind === 'ObjectId') {
             return res.status(404).send({
                 message: "Tap not found with id " + req.params.tapId
             });
         }
         return res.status(500).send({
             message: "Error updating tap with id " + req.params.tapId
         });
     });
};

// Delete a tap with the specified tapId in the request
exports.delete = (req, res) => {
    Tap.findByIdAndRemove(req.params.tapId)
        .then(tap => {
            if (!tap) {
                return res.status(404).send({
                    message: "Tap not found with id " + req.params.tapId
                });
            }
            res.status(204).send({
                message: "Tap deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Tap not found with id " + req.params.tapId
                });
            }
            return res.status(500).send({
                message: "Could not delete tap with id " + req.params.tapId
            });
        });
};

