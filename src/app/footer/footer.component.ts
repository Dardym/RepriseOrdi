import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  redirectQui(){
    this.router.navigate(['/qui']);
    //this.router.navigate(['/qui']);
  }
  
  redirectLegale(){
    this.router.navigate(['/legale']);
  }

  redirectContacts(){
    this.router.navigate(['/contacts']);
  }

}
