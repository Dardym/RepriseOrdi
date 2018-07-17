var nodemailer = require('nodemailer');


 var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'maxime@touchedeclavier.com',
        pass: 'BDYyUojPJVX0touche'
      }
    });
	
  
   var exec = function(data) {
    var texte = insererOffre(data.texte,data.offre);
    var mailOptions = {
      from: 'maxime@touchedeclavier.com',
      to: data.client.email,
      subject: 'Demande de reprise de ' + data.client.nom,
      text: texte
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
  }

  function insererOffre(texte,offre){
    console.log(texte);
    var res = texte.replace("%offre%",offre);
    return res;
  }


exports.exec = exec;