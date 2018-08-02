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

  


  var exec = function(){

    var apiInstance = new SibApiV3Sdk.SMTPApi();

    var templateId = 28; // Number | id of the template

    var html = apiInstance.getSmtpTemplate(templateId).then(function(data) {
    console.log('API called successfully. Returned data: ' + data);
    return data.htmlContent;

    }, function(error) {
    console.error(error);
    });

    return html;
  }


exports.exec = exec;