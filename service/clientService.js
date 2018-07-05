const db = require('../helpers/db');
const Client = db.Client;
 
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
 
async function getAll() {
    return await Client.find();
}
 
async function getById(id) {
    return await Admin.findById(id);
}
 
async function create(clientParam) {
    const client = new Client(clientParam);
 
    // save user
    await client.save();
}
 
async function update(id, clientParam) {
    const client = await Client.findById(id);
 
    // copy userParam properties to user
    Object.assign(client, clientParam);
 
    await client.save();
}
 
async function _delete(id) {
    await Client.findByIdAndRemove(id);
}
