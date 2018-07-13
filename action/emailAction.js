var nodemailer = require('nodemailer');


 var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'maxime@touchedeclavier.com',
        pass: 'BDYyUojPJVX0touche'
      }
    });
	
  
   var exec = function(client) {
     console.log(client);

    var mailOptions = {
      from: 'maxime@touchedeclavier.com',
      to: client.email,
      subject: 'Demande de reprise de ' + client.nom,
      text: "Marque de l'ordinateur: " + client.ordinateur.marque + "\n" +
      "Modele de l'ordinateur: " + client.ordinateur.modele + "\n" +
      "Complet: " + client.ordinateur.complet + "\n" +
      "fonctionnel: " + client.ordinateur.fonctionnel + "\n" +
      "Bon état visuel: " + client.ordinateur.visuel + "\n"  +
      "Description: " + client.ordinateur.description+ "\n"+
      "Nous vous proposons une offre de reprise de: " + client.offre
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
  }


exports.exec = exec;