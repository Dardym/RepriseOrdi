/////////////////////////////////////////////////
//On se sert de sendinblue finalement pas de ça//
/////////////////////////////////////////////////


import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin-service';
import { Observable } from "rxjs";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  email: any="je suis initialisé";

  constructor(
    private adminService: AdminService,
    private meta:Meta
  ) { }

  ngOnInit() {
    this.meta.addTag({ name: 'robots', content: 'noindex' });
    this.adminService.getEmail().subscribe(res => {
      console.log(res);
      this.email = res;
      console.log(this.email);
    }, err => {
      console.log(err);
    });
  }

  sauvegarderEmail(){
    console.log("je suis dans le sauvegarder bouton");
    this.adminService.saveEmail(this.email)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
