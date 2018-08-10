import { Component, OnInit, Input } from '@angular/core';
import { HostListener } from "@angular/core";
import * as $ from 'jquery';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'], animations: [
    trigger('fade', [
      state('inactive', style({ opacity: 1,transform: 'scale(1.0) translate(0,-15px)' })),
      state('active', style({ opacity: 1,transform: 'scale(1.0) translate(0,0px)' })),
      transition('* <=> *', [
        animate(700)
      ])
    ])
  ]
})
export class FrontPageComponent implements OnInit {

  @Input() isOver: boolean = false;
  @Input() state: string = "active";
  mouseOver:boolean = false;
  screenHeight: any;
  screenWidth: any;


  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  constructor() {
    this.onResize();
  }

  ngOnInit() {
  }

  scrollToBottom(scrollDuration) {
    $('html, body').animate({
      scrollTop: $("#ancre-form").offset().top
    }, 1500);
  }

  mouseEnter() {
    
    this.mouseOver = true;
  }

  mouseLeave() {
    this.mouseOver = false;
    let event;
    this.onDone(event);
  }

  onDone($event) {
    // call this function at the end of the previous animation.
    // run it as many time as defined
    if(!this.mouseOver){
      this.state = this.state === 'active' ? 'inactive' : 'active';
    }
      

    }
  }

  //////////////////////////////////////////////
  ////////Méthode sans Jquey #NRV///////////////
  /////////////////////////////////////////////

  /*
    var limit = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    var H = this.screenHeight;
    var W = this.screenWidth;
    var cosParameter = H / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();
    function step (newTimestamp) {
        
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount <= Math.PI) window.scrollTo(0,0);
        if ( Math.round(window.scrollY-H) === 0 || window.scrollY === limit) return;
        window.scrollTo(0, Math.round(cosParameter - cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
    */




  /* 
    Explanations:
    - pi is the length/end point of the cosinus intervall (see above)
    - newTimestamp indicates the current time when callbacks queued by requestAnimationFrame begin to fire.
      (for more information see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
    - newTimestamp - oldTimestamp equals the duration

      a * cos (bx + c) + d                      | c translates along the x axis = 0
    = a * cos (bx) + d                          | d translates along the y axis = 1 -> only positive y values
    = a * cos (bx) + 1                          | a stretches along the y axis = cosParameter = window.scrollY / 2
    = cosParameter + cosParameter * (cos bx)    | b stretches along the x axis = scrollCount = Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
    = cosParameter + cosParameter * (cos scrollCount * x)
*/