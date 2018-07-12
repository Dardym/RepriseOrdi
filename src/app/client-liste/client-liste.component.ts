import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service'
import { Client } from '../metier/client'

@Component({
  selector: 'app-client-liste',
  templateUrl: './client-liste.component.html',
  styleUrls: ['./client-liste.component.css']
})
export class ClientListeComponent implements OnInit {

  listeClients: any = [
    {
      'nom':'maxime dardy',
      'email': 'maxime@touchedeclavier.com',
      'ordinateur':{
        'marque': 'asus',
        'modele': 'unmodele',
        'fonctionnel': 'true',
        'visuel': 'true',
        'complet': 'true',
        'description': 'Ceci est la description détaillé de mon problème.'
      },
      'etat': 'nouveau'
    },
    {
      'nom':'Pierre Baraquant',
      'email': 'tocardu36@hotmail.fre',
      'ordinateur':{
        'marque': 'asus',
        'modele': 'unmodele',
        'fonctionnel': 'false',
        'visuel': 'true',
        'complet': 'false',
        'description': 'Ceci est la description détaillé de mon problème.'
      },
      'etat': 'enCours'
    },
    {
      'nom':'Pierre Baraquant',
      'email': 'tocardu36@hotmail.fre',
      'ordinateur':{
        'marque': 'asus',
        'modele': 'unmodele',
        'fonctionnel': 'false',
        'visuel': 'true',
        'complet': 'false',
        'description': 'Ceci est la description détaillé de mon problème.'
      },
      'etat': 'traite'
    }
  ];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    /*
    this.listeClients = this.apiService.getClients();

    for(var i=0;i<this.listeClients.length;i++){
      console.log(this.listeClients);
    }
    */
  }

}
