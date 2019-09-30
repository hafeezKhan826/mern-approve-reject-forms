const express = require('express');
const router = express.Router();
const { Department } = require('../models/department');
const { User } = require('../models/user');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const secret = 'gladiator';

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }, { password: 0 })
        const token = jwt.sign({
            user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60)
        }, secret)
        if (user) {
            const response = {
                status: 'success',
                user, token
            }
            res.send(response);
        } else {
            const response = {
                status: 'error',
                message: 'User not found'
            }
            res.send(response);
        }
    } catch (error) {
        res.send({ error })
    }
})

isValid = (userObj) => Object.values(userObj).every(val => val !== '')


module.exports = router;
