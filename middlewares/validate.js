const { User } = require('../models/user');

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