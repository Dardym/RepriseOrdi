var express = require('express');
var router = express.Router();
var clientService = require('../service/clientService.js');
var emailService = require('../service/emailService');
var path = require('path');

/* GET ALL ClientS */
router.get('/', function (req, res, next) {
  if (req.session.admin) {
    clientService.getAll()
      .then(function (client) {
        res.json(client);
      })
      .catch(err => next(err));
  } else {
    var err = new Error('Non autorisé');
    err.status = 401;
    throw err;
  }
});


/*ENVOI DE L OFFRE AU CLIENT */
router.post('/sendOffre', function (req, res, next) {
  if (req.session.admin) {
    clientService.sendOffre(req.body.offre, req.body.id)
      .then(function () {
        res.json();
      })
      .catch(err => next(err));
  } else {
    var err = new Error('Non autorisé');
    err.status = 401;
    throw err;
  }

});

/* GET SINGLE Client BY ID */
router.get('/:id', function (req, res, next) {

  console.log(req.params.id);
    clientService.getById(req.params.id)
    .then(function(client){
      console.log("dans le then");
      res.json(client);
    })
    .catch(err => next(err));
});

/* SAVE Client */
router.post('/', function (req, res, next) {

  req.body.ordinateur = {
    marque: req.body.marque,
    modele: req.body.modele,
    complet: req.body.complet,
    visuel: req.body.visuel,
    fonctionnel: req.body.fonctionnel,
    description: req.body.description
  }


    clientService.create(req.body).then(function (post) {
      res.json(post);
    })
      .catch(err =>{
        next(err);
      } );
});

router.post('/contact', function(req,res,next){

  emailService.sendEmailContact(req.body).then(function () {
    res.json({"success":true});
  })
    .catch(err =>{
      res.json({"success":false});
      next(err);
    } );

});

/* UPDATE Client */
router.put('/:id', function (req, res, next) {

  if (req.session.admin) {

    clientService.updates(req.params.id, req.body)
      .then(function (post) {
        res.json(post)
      })
      .catch(err => next(err));

  } else {
    var err = new Error('Non autorisé');
    err.status = 401;
    throw err;
  }
});
/* DELETE Client */
router.delete('/:id', function (req, res, next) {
  if (req.session.admin) {

    clientService._delete(req.params.id, req.body).then(function (err, post) {
      if (err) return next(err);
      res.json(post);})
      .catch(err => next(err));

  } else {
  var err = new Error('Non autorisé');
  err.status = 401;
  throw err;
}
 
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/RepriseOrdi/index.html'));
});



module.exports = router;