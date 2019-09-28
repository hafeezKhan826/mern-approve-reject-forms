const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = 'gladiator';

exports.verifyToken = async (req, res, next) => {
    const { userid, token } = req.headers;
    console.log({ token }, req.headers);
    jwt.verify(token, secret, (err, decoded) => {
        console.log({ err });
        console.log({ decoded });
    })
    const user = await User.findById(userid);
    if (user) {
        console.log({ user });
        next();
    } else {
        res.send({
            status: 'error',
            message: 'unauthorized'
        })
    }

}


exports.validateUser = async (req, res, next) => {
    const { userid } = req.headers;
    const user = await User.findById(userid);
    if (user) {
        console.log({ user });
        next();
    } else {
        res.send({
            status: 'error',
            message: 'unauthorized'
        })
    }

}

exports.validateApplicant = async (req, res, next) => {
    const { userid } = req.headers;
    console.log('Middleware: ', { userid });
    const user = await User.findById(userid);
    if (user) {
        if (user.role === 'applicant') {
            next();
        } else {
            res.send({
                status: 'error',
                message: 'unauthorized'
            })
        }
    } else {
        res.send({
            status: 'error',
            message: 'headers missing'
        })
    }

}

exports.validateManager = async (req, res, next) => {
    const { userid } = req.headers;
    const user = await User.findById(userid);
    if (user) {
        if (user.role === 'manager') {
            next();
        } else {
            res.send({
                status: 'error',
                message: 'unauthorized'
            })
        }
    } else {
        res.send({
            status: 'error',
            message: 'headers missing'
        })
    }

}