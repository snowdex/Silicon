const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true
    },
    attended: {
        type: Number,
        
    },
    total: {
        type: Number,
    }
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;