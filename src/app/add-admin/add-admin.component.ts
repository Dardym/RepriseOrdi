import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormulaireService } from '../services/formulaire-service.service';
import { AdminService } from '../services/admin-service';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  error: string = null;

  adminForm: FormGroup;
  lastName: string = '';
  email: string = '';
  firstName: string = '';
  mdp: string = '';
  confmdp: string = '';

  constructor(private router: Router, private adminService: AdminService, private formBuilder: FormBuilder, private formulaireService: FormulaireService) { }

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      'lastName': [null, Validators.required],
      'email': [null, Validators.required],
      'firstName': [null, Validators.required],
      'mdp': [null, Validators.required],
      'confmdp':[null, Validators.required]

    });
  }

  onFormSubmit(form) {
    if(form.mdp != form.confmdp){
      this.error = "Les mots de passe ne correspondent pas.";
    }
    else{
      this.adminService.register(form)
      .subscribe(res => {
        this.error = null;
        this.router.navigate(['/admin-panel/client-liste']);
      }, (err) => {
        if(err == 453){
          this.error = "L'adresse email que vous avez indiqué est déjà utilisée.";
        }else{
          this.error = "Désolé, une erreur est survenue, merci de réessayer ultérieurement.";
        }
        console.log(err);
      });
    }
  }

}
