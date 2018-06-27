var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    nom: String,
    email: String,
    ordinateur : {
      marque: String,
      modele: String,
      complet: Boolean,
      fonctionnel: Boolean,
      visuel: Boolean
    }
    
  });

  module.exports = mongoose.model('Client', ClientSchema);

  