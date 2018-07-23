const config = require('../config.json');
const db = require('../helpers/db');
const Admin = db.Admin;
const bcrypt = require('bcrypt');
var emailAction = require('../action/emailAction');
 
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
 
async function authenticate(email, password) {

    var admin = await Admin.findOne({email: email});
    if (admin === null) {
        var err = new Error('utilisateur introuvable');
        err.status = 450;
        throw err;
    }
    const match = await bcrypt.compare(password, admin.mdp);
    if(!match){
        var err = new Error('mauvais mot de passe');
        err.status=451;
        throw err;
    }
    return await admin ;
}
 
async function getAll() {
    return await Admin.find().select('-mdp');
}
 
async function getById(id) {
    return await Admin.findById(id).select('-mdp');
}
 
async function create(adminParam) {
    // validate
    console.log(adminParam);
    if (await Admin.findOne({ email: adminParam.email })) {
        var err = new Error('email'+ adminParam.email + 'déjà utilisé');
        err.status = 453;
        throw err;
    }
    const admin = new Admin(adminParam);
    // hash password
    if (adminParam.mdp) {
        admin.mdp = bcrypt.hashSync(adminParam.mdp, 10);
    }
 
    // save user
    await admin.save();
}
 
async function update(id, adminParam) {
    console.log(adminParam);
    const admin = await Admin.findById(id);
 
    console.log(admin);
    // validate
    if (!admin){
        var err = new Error('User not found');
        err.status = 452;
        throw err;
    } 
    if (admin.email !== adminParam.email && await Admin.findOne({ email: adminParam.email })) {
        var err = new Error('email déjà utilisé');
        err.status = 453;
        throw err;
    }
 
    // hash password if it was entered
    if (adminParam.mdp) {
        adminParam.mdp = bcrypt.hashSync(adminParam.mdp, 10);
    }
 
    // copy userParam properties to user
    Object.assign(admin, adminParam);
 
    await admin.save();
}
 
async function _delete(id) {
    await User.findByIdAndRemove(id);
}