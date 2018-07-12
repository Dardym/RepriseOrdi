var express = require('express');
var router = express.Router();
var clientService = require('../service/clientService.js');
var emailAction = require('../action/emailAction');

/* GET ALL ClientS */
router.get('/', function (req, res, next) {
  console.log("je suis dans le get /");
  clientService.getAll()
    .then(function (client) {
      res.json(client);
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
  console.log("je suis dans le post");
  req.body.ordinateur = {
    marque: req.body.marque,
    modele: req.body.modele,
    complet: req.body.complet,
    visuel: req.body.visuel,
    fonctionnel: req.body.fonctionnel,
    description: req.body.description
  }
  console.log(req.body);



  clientService.create(req.body).then(function (err, post) {
    if (err) return next(err);
    //emailAction.exec(req.body);
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

/*DEFAULT REDIRECT*/
router.get('*', function (req, res, next) {
  res.sendFile(path.resolve('../src/index.html'));
});

/*ENVOYER LE PRIX*/
router.get('/envoie-prix',function(req,res,next){
  clientService.sendPrix(req.body).then(function(err, post) {
    if (err) return next(err);
    res.json(post);
  }); 
});


module.exports = router;