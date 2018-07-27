const db = require('../helpers/db');
const Client = db.Client;
const emailAction = require('../action/emailAction');
const emailService = require('./emailService');
const addListAction = require('../action/addListAction');

module.exports = {
    getAll,
    getById,
    create,
    updates,
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
    console.log("je suis dans le client service");
    
    clientParam.etat = "nouveau";
    const client = new Client(clientParam);

    console.log(client);
    // save user
    await client.save();
    console.log("ça par sur un addlistAction ");
    if(client.newsletter){
        await addListAction.exec(client.email);
    }
    
}

async function updates(id, clientParam) {
    try {
        const client = await Client.findById(id);
        // copy userParam properties to user
        Object.assign(client, clientParam);
        var mongoClient = new Client(client);
        return await mongoClient.save();
    } catch (err) {
        console.log(err);
    }

}

async function _delete(id) {
    await Client.findByIdAndRemove(id);
}

async function sendOffre(offre, id) {
    try {
        var client = await Client.findById(id);
        client.offre = offre;
        var clientParam = { offre: offre, etat: "enCours" };
        var texte = await emailService.getEmail();
        var data = {
            client: client,
            offre: offre,
            texte: texte.texte
        }
        await updates(client.id, clientParam);
        await emailAction.exec(data);
    }
    catch (err) {
        console.log(err);
    }
}
