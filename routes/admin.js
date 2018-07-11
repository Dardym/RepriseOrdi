const config = require('../config.json');
const express = require('express');
const router = express.Router();
const adminService = require('../service/adminservice');
 
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/current', getCurrent);
router.get('/logout', my_logout);
router.put('/:id', update);
router.delete('/:id', _delete);


// rewrite virtual urls to angular app to enable refreshing of internal pages
router.get('*', function (req, res, next) {
    res.sendFile(path.resolve('app/index.html'));
});
 
module.exports = router;
 
function authenticate(req, res, next) {
    adminService.authenticate(req.body.email,req.body.password)
        .then(function(admin){
            req.session.email = admin.email;
            res.token = admin._id;
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

function my_logout(req, res, next) {
    console.log("je suis dans la fonction logout du router");
    try{
        console.log(req);
        console.log("je suis dans la fonction logout du router");
        res.json({});
    }
    catch(err){
        next(err);
    }
    
    /*adminService.logout()
    .then(()=>res.json({}))
    .catch(err=>next(err));

        /*req.session.adminId ="";
        res.token = "";
        res.json({'success':true});*/
   

    
}