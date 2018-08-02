import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../services/api.service'
import { Client } from '../metier/client'
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormulaireService } from '../services/formulaire-service.service';
import { nodeValue } from '../../../node_modules/@angular/core/src/view';
import { DialogComponent } from '../dialog/dialog.component';

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

  constructor(public dialog: MatDialog, private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.maj();
  }

  onFormSubmit(offre, id) {
    console.log("Dans le onFormSubmit = offre: "+offre+" id: "+id);
    this.apiService.postOffre(offre, id)
          .subscribe(res => {
            this.maj();
            this.openDialog(offre, id);
          }, (err) => {
            console.log(err);
          });
    
  }

  maj() {
    this.apiService.getClients()
      .subscribe(res => {
        this.listeClients = res;
      }, err => {
        console.log(err);
      });
    this.listeClients.forEach(element => {
      element.proposition = "";
    });

  }

  saveEtat(id, etat) {
    this.apiService.updateClient(id, etat)
      .subscribe(res => {
        console.log("état sauvegardé: " + res);
      }, err => {
        console.log(err);
      });

  }

  openDialog(offre, id) {
    
    console.log("Dans le opendialog = offre: "+offre+" id: "+id);
    const dialogRef = this.dialog.open(DialogComponent, {
      //height: '350px',
      width: '400px'
    });

/*
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.postOffre(offre, id)
          .subscribe(res => {
            this.maj();
          }, (err) => {
            console.log(err);
          });
        
      //} else {
        //console.log("Envoie refusé.");
      //}
    });*/
  }




}
