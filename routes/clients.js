var express = require('express');
var router = express.Router();
var clientService = require('../service/clientService.js');
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



router.post('/sendOffre', function (req, res, next) {
  if (req.session.admin) {
    clientService.sendOffre(req.body.offre, req.body.email)
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
  if (req.session.admin) {

    clientService.findById(req.params.id)
    .then(function (err, post) {
      if (err) return next(err);
      res.json(post);
    })
    .catch(err => next(err));

  } else {
    var err = new Error('Non autorisé');
    err.status = 401;
    throw err;
  }
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

  if (req.session.admin) {

    clientService.create(req.body).then(function (err, post) {
      if (err) return next(err);
      res.json(post);
    })
      .catch(err => next(err));

  } else {
    var err = new Error('Non autorisé');
    err.status = 401;
    throw err;
  }
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