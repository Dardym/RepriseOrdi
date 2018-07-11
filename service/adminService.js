const config = require('../config.json');
const db = require('../helpers/db');
const Admin = db.Admin;
const bcrypt = require('bcrypt');
 
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    logout
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
    console.log("test create");
    // validate
    if (await Admin.findOne({ email: adminParam.email })) {
        var err = new Error('email'+ adminParam.email + 'déjà utilisé');
        err.status = 453;
        throw err;
    }
    const admin = new Admin(adminParam);
    console.log(admin);
    // hash password
    if (adminParam.mdp) {
        admin.mdp = bcrypt.hashSync(adminParam.mdp, 10);
    }
 
    // save user
    await admin.save();
}
 
async function update(id, userParam) {
    const user = await User.findById(id);
 
    // validate
    if (!user){
        var err = new Error('User not found');
        err.status = 452;
        throw err;
    } 
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        var err = new Error('email déjà utilisé');
        err.status = 453;
        throw err;
    }
 
    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
 
    // copy userParam properties to user
    Object.assign(user, userParam);
 
    await user.save();
}
 
async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function logout(){
    console.log("dans le adminservice");
    var err = new Error('utilisateur introuvable');
    err.status = 450;
    throw err;
    //return await true;
}