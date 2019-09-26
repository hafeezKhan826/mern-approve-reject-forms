let mongoose = require('mongoose');
let Schema = require('mongoose').Schema;
 
let FormSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    departmentId: {
        type: String,
        required: true
    },
    userAssignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedDepartment: {
        type: String,
    },
    createdByUser: {
        type: String,
    },
    assignedUser: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['rejected', 'accepted', 'pending'],
        default: 'pending'
    },
    acceptedAt: {
        type: Date
    }
});
let Form = mongoose.model('form', FormSchema);
module.exports = { Form };
