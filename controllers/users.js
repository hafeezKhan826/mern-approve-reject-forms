const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { validateUser } = require('../middlewares/validate');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/add-user', async (req, res, next) => {
    const { fullName, departmentId, email, password } = req.body;
    const userObj = { fullName, departmentId, email, password }
    if (userObj && isValid(userObj)) {
        const user = new User(userObj);
        user.password = user.generateHash(req.body.password);
        await user.save();
        const response = {
            status: 'success',
            message: 'User registered Successfully',
        }
        res.send(response);
    } else {
        const response = {
            status: 'error',
            message: 'required details missing',
        }
        res.send(response);
    }
});

router.post('/edit-user', validateUser, async (req, res, next) => {

    const { fullName, role = 'applicant', departmentId, email } = req.body;
    const userObj = { fullName, role, departmentId, email }
    if (isValid(userObj)) {
        const user = new User(userObj);
        const saver = await user.save();
        const response = {
            status: 'success',
            message: 'User registered Successfully',
        }
        res.send(response);
    } else {
        const response = {
            status: 'error',
            message: 'required details missing',
        }
        res.send(response);
    }
});

router.get('/get-all-users', async (req, res, next) => {
    const users = await User.find({});
    const response = {
        status: 'success',
        users
    }
    res.send(response);
});

router.get('/get-users-from-dept', async (req, res, next) => {
    console.log(req.query.deptId, req.params);
    const deptId = req.query.deptId;
    const users = await User.find({ departmentId: deptId }, { fullName: 1, _id: 1 });
    const response = {
        status: 'success',
        users
    }
    res.send(response);
})

isValid = (userObj) => Object.values(userObj).every(val => val !== '')


module.exports = router;
