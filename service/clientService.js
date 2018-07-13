const db = require('../helpers/db');
const Client = db.Client;
 
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    sendOffre
};
 
async function getAll() {
    return await Client.find();
}
 
async function getById(id) {
    return await Client.findById(id);
}
 
async function create(clientParam) {
    clientParam.etat = "nouveau";
    const client = new Client(clientParam);
 
    // save user
    await client.save();
}
 
async function update(id, clientParam) {
    try{
        console.log("je suis dans le update: "+id);
        const client = await Client.findById(id);
        // copy userParam properties to user
        console.log("avant: " + client);
        Object.assign(client, clientParam);
        console.log("après: " + client);
        var mongoClient = new Client(client);
     
        await mongoClient.save();
    } catch(err){
        console.log(err);
    }
    
}
 
async function _delete(id) {
    await Client.findByIdAndRemove(id);
}

async function sendOffre(offre,email){
    try{
        var client = await Client.findOne({email: email});
        client.offre = offre;   
        var clientParam = {offre: offre, etat: "enCours"};
        var id = {id: client.id};
        console.log(clientParam);
        await Client.update(id,clientParam);
        //await emailAction.exec(client)
    }
    catch(err){
        console.log(err);
    }
}
