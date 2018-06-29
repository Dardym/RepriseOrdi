import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";



@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      console.log(this.screenHeight);
      console.log(this.screenWidth);
      
  }

  constructor() { 
    this.onResize();
  }

  ngOnInit() {
  }

}
