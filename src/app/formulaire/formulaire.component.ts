import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormulaireService } from '../services/formulaire-service.service';
import { Client } from '../metier/client';
import { Ordinateur } from '../metier/ordinateur';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {


  clientForm: FormGroup;
  nom:string='';
  email:string='';
  marque:string='';
  modele:string='';
  complet:boolean=false;
  fonctionnel:boolean=false;
  visuel:boolean=false;
  description:string="";

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private formulaireService : FormulaireService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      'nom' : [null, Validators.required],
      'email' : [null, Validators.required],
      'marque' : [null, Validators.required],
      'modele' : [null, Validators.required],
      'complet' : [false, Validators.required],
      'fonctionnel' : [false, Validators.required],
      'visuel' : [false, Validators.required],
      'description' : [null, Validators.required]
      
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.postClient(form)
      .subscribe(res => {
        this.router.navigate(['/validation']);
          if(res.params.valide){
            alert("Votre demande a bien été prise en compte!");
            
          }else{
            alert("Désolé, nous n'avons pas pu valider votre demande");
          }
        }, (err) => {
          console.log(err);
        });
  }

}
