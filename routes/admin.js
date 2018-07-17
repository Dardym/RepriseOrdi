const config = require('../config.json');
const express = require('express');
const router = express.Router();
const adminService = require('../service/adminservice');
const emailService = require('../service/emailService');
 
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


// rewrite virtual urls to angular app to enable refreshing of internal pages
router.get('*', function (req, res, next) {
    res.sendFile(path.resolve('../src/index.html'));
});
 
module.exports = router;
 
function authenticate(req, res, next) {
    adminService.authenticate(req.body.email,req.body.password)
        .then(function(admin){
            req.session.admin = admin;
            res.success = true;
            res.json({'success':true, 'admin':admin});
        })
        .catch(err => next(err));

}
 
function register(req, res, next) {
    adminService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
 
function getById(req, res, next) {
    adminService.getById(req.params.id)
        .then(admin => admin ? res.json(admin) : res.sendStatus(404))
        .catch(err => next(err));
}
 
function getAll(req, res, next) {
    adminService.getAll()
        .then(admins => res.json(admins))
        .catch(err => next(err));
}
 
function getCurrent(req, res, next) {
    adminService.getById(req.params.adminId)
        .then(admin => admin ? res.json(admin) : res.sendStatus(404))
        .catch(err => next(err));
}
 
function update(req, res, next) {
    adminService.update(req.params.adminId, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
 
function _delete(req, res, next) {
    adminService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function createEmail(req, res, next){
    emailService.create(req.body)
    .then(() => res.json({}))
    .catch(function(err){
        console.log(err);
        next(err);
    });
}

function updateEmail(req, res, next){
    emailService.update(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getEmail(req, res, next){
    emailService.getEmail()
    .then(function(email){
        res.json(email);
    } )
    .catch(err => next(err));
}

function my_logout(req, res, next) {
    try{
        req.session.destroy();
        res.json({success: "true"});
    }
    catch(err){
        console.log(err);
        res.json({success: "false"});
        next(err);
    }
    
    /*adminService.logout()
    .then(()=>res.json({}))
    .catch(err=>next(err));

        /*req.session.adminId ="";
        res.token = "";
        res.json({'success':true});*/
}