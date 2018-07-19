import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import {FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormulaireService } from '../services/formulaire-service.service';
import {MatDialog} from '@angular/material';
import {ValidationDialogComponent} from '../validation-dialog/validation-dialog.component';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  error: boolean = false;

  clientForm: FormGroup;
  nom: string = '';
  email: string = '';
  marque: string = '';
  modele: string = '';
  complet: boolean = false;
  fonctionnel: boolean = false;
  visuel: boolean = false;
  description: string = "";

  constructor(public dialog: MatDialog, private router: Router, private api: ApiService, private formBuilder: FormBuilder, private formulaireService: FormulaireService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      'nom': [null, Validators.required],
      'email': [null, Validators.required],
      'marque': [null, Validators.required],
      'modele': [null, Validators.required],
      'complet': [false, Validators.required],
      'fonctionnel': [false, Validators.required],
      'visuel': [false, Validators.required],
      'description': [null, Validators.required]

    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postClient(form)
      .subscribe(res => {
        this.error = false;
        this.openDialog();
        this.router.navigate(['/']);
      }, (err) => {
        this.error = true;
        console.log(err);
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ValidationDialogComponent, {
      height: '350px',
      width: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log("ça a marché ");
    });
  }

}
