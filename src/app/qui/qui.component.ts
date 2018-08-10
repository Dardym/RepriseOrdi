import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-qui',
  templateUrl: './qui.component.html',
  styleUrls: ['./qui.component.css']
})
export class QuiComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  scrollToFAQ(){
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


}
