var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    id: Number,
    nom: String,
    email: String,
    marque: String,
    modele: String,
    complet: Boolean,
    fonctionnel: Boolean,
    visuel: Boolean
  });

  module.exports = mongoose.model('Client', ClientSchema);