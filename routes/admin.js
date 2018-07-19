const config = require('../config.json');
const express = require('express');
const router = express.Router();
const adminService = require('../service/adminService');
const emailService = require('../service/emailService');
var path = require('path');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/createEmail', createEmail);
router.get('/', getAll);
router.get('/admin/:id', getById);
router.get('/current', getCurrent);
router.get('/logout', my_logout);
router.get('/email', getEmail);
router.put('/admin/:id', update);
router.put('/updateEmail', updateEmail);
router.delete('/:id', _delete);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/RepriseOrdi/index.html'));
});


module.exports = router;

function authenticate(req, res, next) {
    adminService.authenticate(req.body.email, req.body.password)
        .then(function (admin) {
            req.session.admin = admin;
            res.success = true;
            res.json({ 'success': true, 'admin': admin });
        })
        .catch(err => next(err));

}

function register(req, res, next) {
        adminService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    if (req.session.admin) {
        adminService.getById(req.params.id)
            .then(admin => admin ? res.json(admin) : res.sendStatus(404))
            .catch(err => next(err));
    } else {
        var err = new Error('Non autorisé');
        err.status = 401;
        throw err;
    }

}

function getAll(req, res, next) {
    if (req.session.admin) {
        adminService.getAll()
            .then(admins => res.json(admins))
            .catch(err => next(err));
    } else {
        var err = new Error('Non autorisé');
        err.status = 401;
        throw err;
    }

}

function getCurrent(req, res, next) {
    if (req.session.admin) {
        adminService.getById(req.params.adminId)
            .then(admin => admin ? res.json(admin) : res.sendStatus(404))
            .catch(err => next(err));
    } else {
        var err = new Error('Non autorisé');
        err.status = 401;
        throw err;
    }

}

function update(req, res, next) {
    if (req.session.admin) {
        adminService.update(req.params.adminId, req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    } else {
        var err = new Error('Non autorisé');
        err.status = 401;
        throw err;
    }

}

function _delete(req, res, next) {
    if (req.session.admin) {
        adminService.delete(req.params.id)
            .then(() => res.json({}))
            .catch(err => next(err));
    } else {
        var err = new Error('Non autorisé');
        err.status = 401;
        throw err;
    }

}


function createEmail(req, res, next) {
        emailService.create(req.body)
            .then(() => res.json({}))
            .catch(function (err) {
                console.log(err);
                next(err);
            });

}

function updateEmail(req, res, next) {
    if (req.session.admin) {
        emailService.update(req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    } else {
        var err = new Error('Non autorisé');
        err.status = 401;
        throw err;
    }

}

function getEmail(req, res, next) {
    if (req.session.admin) {
        emailService.getEmail()
            .then(function (email) {
                res.json(email);
            })
            .catch(err => next(err));
    } else {
        var err = new Error('Non autorisé');
        err.status = 401;
        throw err;
    }

}

function my_logout(req, res, next) {
    try {
        req.session.destroy();
        res.json({ success: "true" });
    }
    catch (err) {
        console.log(err);
        res.json({ success: "false" });
        next(err);
    }
}