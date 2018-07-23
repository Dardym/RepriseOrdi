import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormulaireService } from '../services/formulaire-service.service';
import { AdminService } from '../services/admin-service';

@Component({
  selector: 'app-changer-mdp',
  templateUrl: './changer-mdp.component.html',
  styleUrls: ['./changer-mdp.component.css']
})
export class ChangerMdpComponent implements OnInit {
  error: string = null;

  mdpForm: FormGroup;
  mdp: string = '';
  confmdp: string = '';

  constructor(private router: Router, private adminService: AdminService, private formBuilder: FormBuilder, private formulaireService: FormulaireService) { }

  ngOnInit() {
    this.mdpForm = this.formBuilder.group({
      'mdp': [null, Validators.required],
      'confmdp': [null, Validators.required]

    });
  }

  onFormSubmit(form) {
    if (form.mdp != form.confmdp) {
      this.error = "Les mots de passe ne correspondent pas.";
    }
    else {
      var curAdmin = JSON.parse(localStorage.getItem('currentAdmin')).admin;
      var data = {
        "mdp": form.mdp,
        "id": curAdmin.id
      }
      this.adminService.update(data)
        .subscribe(res => {
          this.error = null;
          this.router.navigate(['/admin-panel/client-liste']);
        }, (err) => {

          this.error = "Désolé, une erreur est survenue, merci de réessayer ultérieurement.";
          console.log(err);
        });
    }
  }

}
