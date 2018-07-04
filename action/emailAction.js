var nodemailer = require('nodemailer');


 var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'maxime@touchedeclavier.com',
        pass: 'BDYyUojPJVX0touche'
      }
    });
	
  
   var exec = function(data) {
     console.log(data);

    var mailOptions = {
      from: 'maxime@touchedeclavier.com',
      to: data.email,
      subject: 'Demande de reprise de ' + data.nom,
      text: "Marque de l'ordinateur: " + data.ordinateur.marque + "\n" +
      "Modele de l'ordinateur: " + data.ordinateur.modele + "\n" +
      "Complet: " + data.complet + "\n" +
      "fonctionnel: " + data.fonctionnel + "\n" +
      "Bon état visuel: " + data.visuel + "\n"  
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