import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../services/api.service'

import { MatDialog } from '@angular/material';

import { FormBuilder, FormGroup } from '@angular/forms';

import { DialogComponent } from '../dialog/dialog.component';

import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-client-liste',
  templateUrl: './client-liste.component.html',
  styleUrls: ['./client-liste.component.css']
})
export class ClientListeComponent implements OnInit {

  offreForm: FormGroup;
  listeClients: any ;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private meta:Meta) { 
      //this.meta.addTag({ name: 'robots', content: 'noindex' });
    }

  ngOnInit() {
    
    this.maj();
  }

  onFormSubmit(offre, id) {
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
    this.apiService.updateClient(id, {etat:varEtat})
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });

  }

  openDialog(offre, id) {
  
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
