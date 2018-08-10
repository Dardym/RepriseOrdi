var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKey.apiKeyPrefix = 'Token';

var apiInstance = new SibApiV3Sdk.ContactsApi();

var listId = 23; // Number | Id of the list

var exec = function (client) {
  var email = client.email;
  var nomPrenom = client.nom.split(' ');
    var nom = nomPrenom[0];
    var prenom = nomPrenom[1];
    /*if(nomPrenom.size>1){
        prenom = nomPrenom[1];
    }*/

  apiInstance.getContactInfo(email).then(function(contact) {

      apiInstance.addContactToList(listId, {'emails': [email] }).then(function (data) {
        console.log('API called successfully. Returned data: ' + data);
      }, function (error) {
        console.error(error);
      });

  }).catch(function(){

    apiInstance.createContact({
      'email': email,
      'listIds': [listId],
      'attributes': {'PRENOM': prenom, 'NOM': nom}
    }).then(function (data) {
      console.log('API called successfully. Returned data: ' + data);
    }, function (error) {
      console.error(error);
    });
    
  });

}


exports.exec = exec;