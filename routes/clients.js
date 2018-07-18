var express = require('express');
var router = express.Router();
var clientService = require('../service/clientService.js');
var path = require('path');

/* GET ALL ClientS */
router.get('/', function (req, res, next) {
  clientService.getAll()
    .then(function (client) {
      res.json(client);
    })
    .catch(err => next(err));
 
});

router.post('/sendOffre',function (req, res, next) {
  clientService.sendOffre(req.body.offre, req.body.email)
    .then(function () {
      res.json();
    })
    .catch(err => next(err));
 
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
    fonctionnel: req.body.fonctionnel,
    description: req.body.description
  }
  clientService.create(req.body).then(function (err, post) {
    if (err) return next(err);
    //emailAction.exec(req.body);
    res.json(post);
    });

  
});

/* UPDATE Client */
router.put('/:id', function (req, res, next) {
  clientService.updates(req.params.id, req.body)
  .then(function (post) {
    res.json(post);
  })
  .catch(err => next(err));
});

/* DELETE Client */
router.delete('/:id', function (req, res, next) {
  clientService._delete(req.params.id, req.body).then(function (err, post) {
    if (err) return next(err);
    res.json(post);
  }); 
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/RepriseOrdi/index.html'));
});



module.exports = router;