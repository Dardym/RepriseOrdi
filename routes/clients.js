var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Client = require('../models/Client.js');
var serializer = require('../serializer/serializer.js')
var emailAction = require('../action/emailAction');

/* GET ALL ClientS */
router.get('/formulaire', function(req, res, next) {
  res.send('../src/app/app.component.html');
  /*Client.find(function (err, products) {
    if (err) return next(err);
    console.log("je passe le if");
    res.json(products);
  });*/
});

/* GET SINGLE Client BY ID */
router.get('/:id', function(req, res, next) {
  Client.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Client */
router.post('/', function(req, res, next) {

  req.body.ordinateur = {
    marque: req.body.marque,
    modele: req.body.modele,
    complet: req.body.complet,
    visuel: req.body.visuel,
    fonctionnel: req.body.fonctionnel
  }

  Client.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
  console.log("j'entre dans dans nodemailer");
  emailAction.exec();
  console.log("je sors de nodemailer");
});

/* UPDATE Client */
router.put('/:id', function(req, res, next) {
  Client.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Client */
router.delete('/:id', function(req, res, next) {
  Client.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*DEFAULT REDERICT*/
router.get('/',function (req, res) {
  res.redirect('/formulaire');
});

/*DEFAULT REDIRECT*/
router.get('*',function (req, res) {
  res.redirect('/');
});

module.exports = router;