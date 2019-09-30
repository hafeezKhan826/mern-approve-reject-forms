const express = require('express');
const router = express.Router();
const { Form } = require('../models/form');
const { validateUser, validateApplicant, validateManager } = require('../middlewares/validate');
const { Department } = require('../models/department');
const { User } = require('../models/user');

router.get('/', (req, res, next) => {
    res.send('form routes triggered');
});

router.post('/submit-form', validateUser, async (req, res, next) => {
    const { message, departmentId, userAssignedTo, title } = req.body;
    const { userid } = req.headers;
    console.log('Aslpl: ', message, departmentId, userAssignedTo, title);

    const formObj = {
        title,
        message,
        departmentId,
        userAssignedTo,
        createdBy: userid,
        status: 'pending'
    };
    if (isValid(formObj)) {
        const form = new Form(formObj);
        const assignedUser = await User.findById(form.userAssignedTo);
        form.assignedUser = assignedUser.fullName;
        const createdByUser = await User.findById(form.createdBy);
        form.createdByUser = createdByUser.fullName;
        // const assignedDepartment = await Department.findById(form.departmentAssignedTo);
        // form.assignedDepartment = assignedDepartment.name;
        await form.save();
        const response = {
            status: 'success',
            message: 'Form Submitted Successfully',
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

router.post('/accept-reject', async (req, res, next) => {
    const { formId, acceptStatus } = req.body;
    const { userid } = req.headers;
    console.log(formId, userid, acceptStatus);
    const formFound = await Form.findById(formId);
    if (formFound) {
        Form
            .findOneAndUpdate({ '_id': formId })
            .then(result => {
                console.log({ result });
                if (result.userAssignedTo == userid) {
                    result.updatedAt = Date.now();
                    result.status = acceptStatus;
                    // result.save();
                    result.save();
                    const response = {
                        status: 'success',
                        message: 'Approved successfully'
                    }
                    res.send(response)
                } else {
                    const response = {
                        status: 'error',
                        message: 'Assigned to different manager'
                    }
                    res.send(response)
                }
            })
            .catch((err) => { res });
    }

    /* if (isValid(formObj)) {
        console.log('Valid values: ', message, departmentAssignedTo, userAssignedTo);
        const form = new Form(formObj);
        await form.save();
        const response = {
            status: 'success',
            message: 'Form Submitted Successfully',
        }
        res.send(response);
    } else {
        const response = {
            status: 'error',
            message: 'required details missing',
        }
        res.send(response);
    } */
});

// validateUser

router.get('/get-all-forms', async (req, res, next) => {
    try {
        const forms = await Form.find({}, {
            createdBy: 0,
            departmentAssignedTo: 0,
            assignedDepartment: 0
        });
        const response = {
            status: 'success',
            forms
        }
        res.send(response)
    } catch (err) {
        const response = {
            status: 'error'
        }
        res.send(response)
    }

})

router.get('/get-all-dept-forms', async (req, res, next) => {
    const { departmentId } = req.query;
    try {
        const forms = await Form.find({ departmentId }, {
            createdBy: 0,
            departmentAssignedTo: 0,
            assignedDepartment: 0
        });
        const response = {
            status: 'success',
            forms
        }
        res.send(response)
    } catch (err) {
        const response = {
            status: 'error'
        }
        res.send(response)
    }

})

isValid = (obj) => Object.values(obj).every(val => val !== '')
module.exports = router;
