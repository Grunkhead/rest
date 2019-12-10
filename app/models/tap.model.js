const mongoose = require('mongoose');

const TapSchema = new mongoose.Schema({
    name: String,
    description: String,
    something: String
}, {
    timestamps: true,
    id: false
});

TapSchema.set('toObject', {
    virtuals: true
})

TapSchema.set('toJSON', {
    virtuals: true
})

// Add virtual properties to the model instance.
TapSchema.virtual('_links').get(function() {
    return {
        "self": {
            "href": 'http://145.24.222.249/taps/' + this._id,
        },
        "collection": {
            "href": 'http://145.24.222.249/taps'
        }
    };
});

module.exports = mongoose.model('Tap', TapSchema);
