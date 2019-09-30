const express = require('express');
const router = express.Router();
const { Department } = require('../models/department');
const { validateUser, verifyToken } = require('../middlewares/validate');

router.get('/', (req, res, next) => {
    res.send('department routes triggered');
});

function addRandomChars(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return '-' + result;
}

function removeSpaces(name) {
    return name.split(' ').join('-');
}

router.post('/add-department', async (req, res, next) => {
    const { name, description } = req.body;
    const departmentId = removeSpaces(name) + addRandomChars(5)
    const departmentObj = { name, description, departmentId };
    if (isValid(departmentObj)) {
        const department = new Department(departmentObj);
        const saver = await department.save();
        const response = {
            status: 'success',
            message: 'Department Entered Successfully',
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

router.get('/all-departments',  async (req, res, next) => {
    const departments = await Department.find({}, { name: 1, departmentId: 1, _id: 0 });
    const response = {
        status: 'success',
        departments
    }
    res.send(response);
})

isValid = (obj) => Object.values(obj).every(val => val !== '')
module.exports = router;
