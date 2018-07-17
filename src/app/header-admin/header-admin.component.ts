import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor( private authentificationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authentificationService.logout()
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        });
  }



}
