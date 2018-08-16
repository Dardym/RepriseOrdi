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
import { MatSidenavModule } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-client-liste',
  templateUrl: './client-liste.component.html',
  styleUrls: ['./client-liste.component.css']
})
export class ClientListeComponent implements OnInit {

  offreForm: FormGroup;
  listeClients: any ;

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

  saveEtat(id, varEtat) {
    console.log(id);
    this.apiService.updateClient(id, {etat:varEtat})
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
