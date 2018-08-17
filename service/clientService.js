const db = require('../helpers/db');
const Client = db.Client;
const emailAction = require('../action/emailAction');
const emailService = require('./emailService');
const addListAction = require('../action/addListAction');
const generateRetourAction = require('../action/generateRetourAction');
const updateEmailAction = require('../action/updateEmailAction');

module.exports = {
    getAll,
    getById,
    create,
    updates,
    delete: _delete,
    sendOffre,
    getLabel
};

async function getAll() {
    return await Client.find().sort({date:-1});
}

async function getById(id) {
    let client = await Client.findById(id); 
    return client;
}

async function create(clientParam) {
    clientParam.etat = "nouveau";
    clientParam.numero = await Client.count() + 1;
    const client = new Client(clientParam);

    // save user
    await client.save();
    if (client.newsletter) {
        await addListAction.exec(client);
    }
    await emailService.sendEmailNotif();
    await emailService.sendEmailClient(client.email);

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
        var clientParam = { offre: offre, etat: "enCours" };
        var data = {
            client: client,
            offre: offre
        }
        await updates(client.id, clientParam);
        var url = await generateRetourAction.exec(data);
        data = {
            client: client,
            offre: offre,
            url: url.label
        }
        await emailAction.exec(data);
    }
    catch (err) {
        console.log(err);
    }
}

async function getLabel(data) {
    return await generateRetourAction.exec(data);
}

