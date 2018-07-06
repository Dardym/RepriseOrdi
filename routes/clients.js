var express = require('express');
var router = express.Router();
var clientService = require('../service/clientService.js');
var emailAction = require('../action/emailAction');

/* GET ALL ClientS */
router.get('/', function (req, res, next) {
    /*if (err) return next(err);
    res.json(products);*/
});

/* GET SINGLE Client BY ID */
router.get('/:id', function (req, res, next) {
  clientService.findById(req.params.id).then(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
  //});
});

/* SAVE Client */
router.post('/', function (req, res, next) {

  req.body.ordinateur = {
    marque: req.body.marque,
    modele: req.body.modele,
    complet: req.body.complet,
    visuel: req.body.visuel,
    fonctionnel: req.body.fonctionnel
  }



  clientService.create(req.body).then(function (err, post) {
    if (err) return next(err);
    emailAction.exec(req.body);
    res.json(post);
    });

  
});

/* UPDATE Client */
router.put('/:id', function (req, res, next) {
  clientService.update(req.params.id, req.body).then(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Client */
router.delete('/:id', function (req, res, next) {
  clientService._delete(req.params.id, req.body).then(function (err, post) {
    if (err) return next(err);
    res.json(post);
  }); 
});

/*DEFAULT REDERICT*/
router.get('/', function (req, res) {
  res.redirect('/formulaire');
});

/*DEFAULT REDIRECT*/
router.get('*', function (req, res) {
  res.redirect('/');
});


module.exports = router;