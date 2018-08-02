//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////N'est finalement pas utilisé, on ne met pas de pièce jointe mais un lien dans une variable.///////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix = 'Token';

var apiInstance = new SibApiV3Sdk.SMTPApi();

var templateId = 28; // Number | id of the template

var exec = function (html,url) {
    console.log("je suis dans le updateEmail");
    console.log(url);
    var smtpTemplate = {
            'htmlContent' : html,
            'attachmentUrl': 'C:/Users/maxim/Downloads/8R31002784704.pdf'
        }
        
    console.log(smtpTemplate);
    apiInstance.updateSmtpTemplate(templateId, smtpTemplate).then(function () {
        console.log('API called successfully.');
    }, function (error) {
        console.log("ah, erreur");
        console.error(error);
    });

};

exports.exec = exec;