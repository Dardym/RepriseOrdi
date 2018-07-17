var mongoose = require('mongoose');

var EmailSchema = new mongoose.Schema({
    texte: String
  });

  EmailSchema.set('toJSON', { virtuals: true });

  module.exports = mongoose.model('Email', EmailSchema);
