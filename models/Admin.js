const mongoose = require('mongoose');
const brcypt = require('bcrypt');
const Schema = mongoose.Schema;
 
const schema = new Schema({
    email: { type: String, unique: true, required: true },
    mdp: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
 
module.exports = mongoose.model('Admin', schema);