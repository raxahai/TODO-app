const mongoose = require('mongoose');
const toDoRouter = require('../routes/toDoRoute');

const toDoSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('ToDo', toDoSchema);