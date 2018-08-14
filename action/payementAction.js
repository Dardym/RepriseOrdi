var stripe = require("stripe")("sk_test_IFfouLxqBhJXcpae310FK0e8");

var exec = function(data,offre,token){
  console.log(data);
    stripe.customers.create({
      description: 'Client repriseordi.fr numéro' + data.numero,
      source: token, // obtained with Stripe.js
      email: data.email,
      metadata: {
        nom: data.nom,
        adresse: data.adresse,
        ville: data.ville,
        postal: data.postal,
        numero: data.numero,
        offre: offre
      }
    }, function(err, customer) {
      if(err){
        console.log(err);
      } else{
        console.log(customer);
        return customer;
      }
    });
}

exports.exec = exec;