const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;
 
module.exports = {
    Admin: require('../models/Admin'),
    Client: require('../models/Client'),
    Email: require('../models/Email')
};