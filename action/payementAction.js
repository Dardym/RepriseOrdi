var stripe = require("stripe")("sk_test_pzqNn32eYmKvLudBbGbIntJT");

var exec = function(data,offre,token){

  console.log("dans le exec");
    let amount = offre*100; // 500 cents means $5
    console.log("offre: "+ offre);
    console.log("token: "+ token);

    stripe.customers.create({
      description: 'Client repriseordi.fr numéro' + data.numero,
      //source: token, // obtained with Stripe.js
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
        console.log("je suis passé par là !");
        console.log(err);
      } else{
        console.log(customer);
        return customer;
      }
      
      
    });
    
    /*
    stripe.payouts.create({
        amount: amount,
        currency: "eur",
        destination: client.id

      }, function(err, payout) {
          console.log(err);
        // asynchronously called
      });
      */

      /*
      stripe.transfers.create({
        amount: amount,
        currency: "eur",
        destination: token
        //transfer_group: "ORDER_95"
      }, function(err, transfer) {
          console.log(err);
        // asynchronously called
      });
      */
}

exports.exec = exec;