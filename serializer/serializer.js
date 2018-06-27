class serializer {
    constructor(){};

    addOrdinateur(HttpReq){
        HttpReq.body.ordinateur = {
            marque: HttpReq.body.marque,
            modele: HttpReq.body.modele,
            complet: HttpReq.body.complet,
            visuel: HttpReq.body.visuel,
            fonctionnel: HttpReq.body.fonctionnel
        }
    };
}

module.exports = serializer;