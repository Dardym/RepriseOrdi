const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const Admin = db.Admin;
 
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
 
async function authenticate({ email, password }) {
    const admin = await Admin.findOne({ email });
    if (admin && bcrypt.compareSync(password, admin.mdp)) {
        const { mdp, ...adminWithoutMdp } = admin.toObject();
        const token = jwt.sign({ sub: admin.id }, config.secret);
        return {
            ...adminWithoutMdp,
            token
        };
    }
}
 
async function getAll() {
    return await Admin.find().select('-mdp');
}
 
async function getById(id) {
    return await Admin.findById(id).select('-mdp');
}
 
async function create(adminParam) {
    // validate
    if (await Admin.findOne({ email: adminParam.email })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
 
    const user = new User(userParam);
 
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
 
    // save user
    await user.save();
}
 
async function update(id, userParam) {
    const user = await User.findById(id);
 
    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
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