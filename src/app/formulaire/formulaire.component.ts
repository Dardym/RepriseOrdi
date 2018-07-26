import { Component,OnChanges, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import {FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormulaireService } from '../services/formulaire-service.service';
import {MatDialog} from '@angular/material';
import {ValidationDialogComponent} from '../validation-dialog/validation-dialog.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0) translate(0,25px)' })),
      state('false', style({ opacity: 0, transform: 'scale(1.0) translate(0,0)'  })),
      transition('1 => 0', animate('150ms')),
      transition('0 => 1', animate('150ms'))
    ])
  ]
})
export class FormulaireComponent implements OnInit {

  @Input() isVisible : boolean = false;

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
        this.isVisible = false;
        this.error = null;
        this.openDialog();
        this.router.navigate(['/']);
      }, (err) => {
        if(err == 453){
          this.error = "L'adresse email que vous avez indiqué est déjà utilisée.";
          this.isVisible = true;
        }else{
          this.error = "Désolé, une erreur est survenue, merci de réessayer ultérieurement.";
          this.isVisible = true;
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
    console.log("je suis dans mouse enter");
    if(!this.clientForm.valid){
      this.error = "Veuillez remplir tous les champs obligatoires."
      this.isVisible = true;
      console.log("je suis dans mouse enter if");
    }else{
      this.isVisible = false;
      console.log("je suis dans mouse enter else");
    }
  }

  mouseLeave(){
    
    this.isVisible = false;
  }

}
