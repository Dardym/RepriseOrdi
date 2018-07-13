import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../services/api.service'
import { Client } from '../metier/client'
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormulaireService } from '../services/formulaire-service.service';
import { nodeValue } from '../../../node_modules/@angular/core/src/view';

@Component({
  selector: 'app-client-liste',
  templateUrl: './client-liste.component.html',
  styleUrls: ['./client-liste.component.css']
})
export class ClientListeComponent implements OnInit {

  offreForm: FormGroup;
  listeClients: any = [
    /*{
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
      'etat': 'nouveau',
      'offre': '0'
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
    }*/
  ];

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.maj();
    
  }

  onFormSubmit(offre,email){

    this.apiService.postOffre(offre,email)
      .subscribe(res => {
        console.log("mail envoyé" + res);
        this.maj();
        }, (err) => {
          console.log(err);
        });

  }

  maj(){
    this.apiService.getClients()
    .subscribe(res => {
      this.listeClients = res;
      console.log(this.listeClients);
    }, err => {
      console.log(err);
    });
    this.listeClients.forEach(element => {
      element.proposition="";
    });
    
  }

  saveEtat(id,etat){
    this.apiService.updateClient(id,etat)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    
  }



}
