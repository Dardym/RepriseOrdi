const colissimo = require('colissimo')({ contract_number: '825750', password: 'Colissimo10+' })

var exec = function (data) {

    var nomPrenom = data.client.nom.split(' ');
    console.log(nomPrenom);
    var nom = nomPrenom[0];
    var prenom = nomPrenom[1];

    /*if(nomPrenom.size>1){
        prenom = nomPrenom[1];
    }*/

    var param = {

        sender: {
            last_name: nom,
            first_name: prenom,
            address: '11 AVENUE DE BEL AIR',
            to_know: '',
            zip_code: '69100',
            city: 'VILLEURBANNE',
            phone_number: '',
            mail: data.client.email
    },
        receiver: {
            company_name: 'INFORMASUR',
            address: '11 AVENUE DE BEL AIR',
            to_know: '',
            zip_code: '69100',
            city: 'VILLEURBANNE',
            phone_number: '0980800221',
            mail: 'client@touchedeclavier.com'
        },
        product: {
            identifier: '',				// used to identify a package when you received it. its displayed before the company_name
            insurance_value: 0,
            weight: '1'						// in kg, default 1
        },
        format: {
            commercial_name: 'INFORMASUR' // used for notifications
        }
    };

    var url = colissimo.return(param
        ).then(infos => {
            return infos;
        }).catch(error => {
            console.error(error);
        });

    return url;
}

exports.exec = exec;