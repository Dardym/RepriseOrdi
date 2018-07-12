var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    nom: String,
    email: String,
    ordinateur : {
      marque: String,
      modele: String,
      complet: Boolean,
      fonctionnel: Boolean,
      visuel: Boolean,
      description: String
    },
    etat: String
    
  });

  //ClientSchema.set('toJSON', { virtuals: true });

  module.exports = mongoose.model('Client', ClientSchema);

  