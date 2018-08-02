const config = require('../config.json');
const db = require('../helpers/db');
const Email = db.Email;
const bcrypt = require('bcrypt');
const emailAction = require('../action/emailAction');
const getEmailAction = require('../action/getEmailAction');
const generateRetourAction = require('../action/generateRetourAction');
 
module.exports = {
    getEmail,
    create,
    update,
    delete: _delete,
    getEmailSendinblue,
    getURLRetour
};
 
async function getEmail() {
    return await Email.findOne();
}

async function getEmailSendinblue() {
    var ret = getEmailAction.exec();
    console.log("Le html: "+ ret);
    return await ret ;
}


async function getURLRetour(data) {
    console.log("je suis dans url retour");
    var ret = await generateRetourAction.exec(data);
    await console.log("URL DE getURLRETOUR"+ret);
    return await ret ;
}

async function create(texte) {

    // validate
    if (await Email.findOne()) {
        var err = new Error('Un email existe déjà !');
        err.status = 453;
        throw err;
    }
    const email = new Email(texte);
 
    // save user
    await email.save();
}
 
async function update(texte) {
    try{
        const email = await Email.findOne();
        // validate
        if (!email){
           await create(texte);
        } 
     
        // copy userParam properties to user
        Object.assign(email,texte);
        await email.save();
    }
    catch(err){
        console.log(err);
    }
    
}
 
async function _delete(id) {
    await Email.findByIdAndRemove(id);
}