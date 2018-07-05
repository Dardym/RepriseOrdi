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
  }

  constructor() {
    this.onResize();
  }

  ngOnInit() {
  }

  scrollToBottom(scrollDuration) {

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
}
}



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