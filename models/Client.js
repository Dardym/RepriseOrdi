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
    etat: String,
    date: { type: Date, default: Date.now },
    offre: { type: Number, default: 0 }
    
  });

  //ClientSchema.set('toJSON', { virtuals: true });

  module.exports = mongoose.model('Client', ClientSchema);

  