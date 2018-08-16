var stripe = require("stripe")("sk_test_8FlIV8pkhQJHfALwQwTlLraU");

var exec = function(data,offre,token){

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
        return customer;
      }
    });
}

exports.exec = exec;