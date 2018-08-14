  var SibApiV3Sdk = require('sib-api-v3-sdk');

  var defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  var apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = "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"
  // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
  //apiKey.apiKeyPrefix['api-key'] = "Token"

  


  var exec = function(data){
    var apiInstance = new SibApiV3Sdk.SMTPApi();

    let paiementUrl = "https://repriseordi.fr/paiement/" + data.client.id;

    var sendSmtpEmail =
      {
        "to": [{'name': data.client.nom, 'email': data.client.email}],
        "templateId": 28,
        "params": {'OFFRE': data.offre, 'BORDEREAU':data.url, 'PAIEMENT': paiementUrl}
      };
      
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
      console.error(error);
    });

  }


exports.exec = exec;