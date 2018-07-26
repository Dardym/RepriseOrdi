/*var nodemailer = require('nodemailer');


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
*/

  function insererOffre(texte,offre){
    console.log(texte);
    var res = texte.replace("%offre%",offre);
    return res;
  }

  
  var SibApiV3Sdk = require('sib-api-v3-sdk');

  var defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  var apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = "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"
  // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
  //apiKey.apiKeyPrefix['api-key'] = "Token"

  var apiInstance = new SibApiV3Sdk.SMTPApi();


  var exec = function(data){
    console.log("je rentre dans le exec");
    var texte = insererOffre(data.texte,data.offre);

    var sendSmtpEmailSender = new SibApiV3Sdk.SendSmtpEmailSender({
      "email": "maxime@touchedeclavier.com"
    });

    var sendSmtpEmailTo = new SibApiV3Sdk.SendSmtpEmailTo({
      "email": "maxime@touchedeclavier.com"
    })
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(
      {
        "sender" : sendSmtpEmailSender,
        "to": [sendSmtpEmailTo],
        "textContent": texte,
        "subject": "reprise de votre ordinateur"
      }
    ); // SendSmtpEmail | Values to send a transactional email
    console.log("j'ai créé: " + sendSmtpEmail);

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
      console.error(error);
    });
  }


exports.exec = exec;