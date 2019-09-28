const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    departmentId: {
        type: String,
        required: true
    },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
const Department = mongoose.model('departments', departmentSchema);
module.exports = { Department };
