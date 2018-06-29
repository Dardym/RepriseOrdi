import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {

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
