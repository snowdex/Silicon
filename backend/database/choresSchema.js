const mongoose = require('mongoose');

const choresSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
});

const Chore = mongoose.model('Chore', choresSchema);

module.exports = Chore;