import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormulaireService } from '../formulaire-service.service';
import { Client } from '../client';
import { Ordinateur } from '../ordinateur';

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
  

  /*@Input() client: Client = {
    id: 0,
    nom: '',
    email: '',
    ordinateur : {
      modele: '',
      marque: '',
      complet: false,
      fonctionnel: false,
      visuel: false
    }

  }*/

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private formulaireService : FormulaireService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      'nom' : [null, Validators.required],
      'email' : [null, Validators.required],
      'marque' : [null, Validators.required],
      'modele' : [null, Validators.required],
      'complet' : [false, Validators.required],
      'fonctionnel' : [false, Validators.required],
      'visuel' : [false, Validators.required]
      
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.postClient(form)
      .subscribe(res => {
          if(res.params.valide){
            alert("Votre demande a bien été prise en compte!");
          }else{
            alert("Désolé, nous n'avons pas pu valider votre demande");
          }
          //Pour rediriger et faire un truc jolie
          /*this.router.navigate(['/book-details', id]);*/
        }, (err) => {
          console.log(err);
        });
  }

}
