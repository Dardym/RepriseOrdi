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

  error: string = null;

  clientForm: FormGroup;
  nom: string = '';
  email: string = '';
  marque: string = '';
  modele: string = '';
  complet: boolean = false;
  fonctionnel: boolean = false;
  visuel: boolean = false;
  description: string = "";
  newsletter: boolean = false;

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
      'description': [null]

    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postClient(form)
      .subscribe(res => {
        this.error = null;
        this.openDialog();
        this.router.navigate(['/']);
      }, (err) => {
        if(err == 453){
          this.error = "L'adresse email que vous avez indiqué est déjà utilisée.";
        }else{
          this.error = "Désolé, une erreur est survenue, merci de réessayer ultérieurement.";
        }
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

  mouseEnter(){
    if(!this.clientForm.valid){
      this.error = "Veuillez remplir tous les champs obligatoires."
    }else{
      this.error = null;
    }
  }

  mouseLeave(){
    
  }

}
