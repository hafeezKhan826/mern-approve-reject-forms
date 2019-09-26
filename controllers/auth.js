const express = require('express');
const router = express.Router();
const { Department } = require('../models/department');
const { User } = require('../models/user');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const secret = 'gladiator';

router.post('/login', async (req, res, next) => {
    const token = req.body;
    jwt.verify(secret, )
    const { email, password } = req.body;
    try {
        const user = User.findOne({ email })
        if (user) {
            res.send(user);
        }
    } catch (error) {
        console.log();
        res.send({ error })
    }
})

isValid = (userObj) => Object.values(userObj).every(val => val !== '')


module.exports = router;
