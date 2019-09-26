const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    departmentId: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
});
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.compareHash = function(password) {
    return (bcrypt.compareSync(password, this.password));
};
const User = mongoose.model('users', UserSchema);
module.exports = { User };
