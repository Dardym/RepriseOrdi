import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { templateJitUrl } from '../../../node_modules/@angular/compiler';
import {SidenavService} from '../services/sidenav.service';
import { MatSidenavModule, MatSidenav } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private sidenavService: SidenavService) {
  }

  ngOnInit() {
    //console.log(this.sidenavService.getSidenav());
  }

  scrollToForm() {
    this.sidenavService.close();
    let url:String = this.router.url;
    console.log(url);
    if(url == "/"){
      $('html, body').animate({
        scrollTop: $("#ancre-form").offset().top
      }, 1500);
    }else{
      this.router.navigate(['/']);

      $( document ).ready(function() {
        $('html, body').animate({
          scrollTop: $("#ancre-form").offset().top
        }, 1500);
      });
      
    }
  }

  redirectQui() {
    this.sidenavService.close();
    this.router.navigate(['/qui']);
    //this.router.navigate(['/qui']);
  }

  redirectContacts() {
    this.sidenavService.close();
    this.router.navigate(['/contacts']);
  }

  scrollToFAQ(){
    this.sidenavService.close();
    let url:String = this.router.url;
    console.log(url);
    if(url == "/"){
      $('html, body').animate({
        scrollTop: $("#ancre-FAQ").offset().top
      }, 2000);
    }else{
      this.router.navigate(['/']);

      $( document ).ready(function() {
        $('html, body').animate({
          scrollTop: $("#ancre-FAQ").offset().top
        }, 2000);
      });
      
    }
  }

  /**
   * Method to toggle application sidenav.
   */
  public toggleSidenav() {
    console.log("je suis dans le toggleButton");
    console.log("le get sidenav: " + this.sidenavService.getSidenav());
    this.sidenavService
      .serviceToggle()
      .then(()=>{console.log("ça marche !")})
      .catch(err => console.log(err));
  }

}
