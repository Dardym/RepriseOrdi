const config = require('../config.json');
const express = require('express');
const router = express.Router();
const adminService = require('../service/adminService');
const emailService = require('../service/emailService');
const payementAction = require('../action/payementAction');
var path = require('path');

// routes
router.post('/authenticate', authenticate);
//router.post('/testLaPost', testLaPost); // pour les tests
router.post('/register', register);
router.post('/createEmail', createEmail);
router.post('/paiement',paiement);
router.get('/', getAll);
router.get('/admin/:id', getById);
router.get('/current', getCurrent);
router.get('/logout', my_logout);
router.get('/email', getEmail);
router.get('/emailSiB', getEmailSiB);
router.get('/notifEmail', notifEmail);
router.put('/update', update);
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

function notifEmail(req,res,next){
    emailService.sendEmailNotif()
        .then(function (admin) {
            res.json(true);
        })
        .catch(err => next(err));
}

function paiement(req,res,next){
    adminService.payment(req.body.data,req.body.offre,req.body.token)
        .then(function (rep) {
            res.json({success:true});
        })
        .catch(function(err){
            next(err)
        });
}

//////uniquement pour les test de l'api de lapost et autres
/*
function testLaPost(req, res, next) {
    
    console.log("je suis dans testLaPost");
    console.log(req.body);
    var html = getEmailAction.exec()
    .then(function(html){

        updateEmailAction.exec(html, req.body)
        .then(function (url) {
            console.log("je suis dans le then");
            res.json(true);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
   
    
   getEmailAction.exec()
   .then(function(ret){
       console.log(ret)
       res.json(true);
   })
   .catch(err => next(err));
    
}*/

function register(req, res, next) {
    req.session.admin = true;
    if (req.session.admin) {
        adminService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
    } else {
        var err = new Error('Non autorisé');
        err.status = 401;
        throw err;
    }
        
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
        adminService.update(req.body.id, req.body)
            .then(() => res.json({}))
            .catch(err => {
                res.json(err);
                next(err)
            });
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
       
            if (req.session.admin) {
                emailService.create(req.body)
                .then(() => res.json({}))
                .catch(function (err) {
                    console.log(err);
                    next(err);
                });
            } else {
                var err = new Error('Non autorisé');
                err.status = 401;
                throw err;
            }

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

function getEmailSiB(req, res, next) {
    if (req.session.admin) {
        emailService.getEmailSendinblue()
            .then(function (email) {
                console.log(email);
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