var stripe = require("stripe")("sk_test_pzqNn32eYmKvLudBbGbIntJT");

var exec = function(offre,token){

    let amount = offre*100; // 500 cents means $5
    console.log("offre: "+offre);
    console.log("token: "+token);
 
    /*stripe.payouts.create({
        amount: amount,
        currency: "eur",
        destination: token

      }, function(err, payout) {
          console.log(err);
        // asynchronously called
      });*/

      stripe.transfers.create({
        amount: amount,
        currency: "eur",
        destination: token
        //transfer_group: "ORDER_95"
      }, function(err, transfer) {
          console.log(err);
        // asynchronously called
      });
 
}

exports.exec = exec;