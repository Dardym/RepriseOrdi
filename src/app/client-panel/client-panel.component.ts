import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidenavService } from '../services/sidenav.service';
import { MatSidenav, MatSidenavModule } from '../../../node_modules/@angular/material';
@Component({
  selector: 'app-client-panel',
  templateUrl: './client-panel.component.html',
  styleUrls: ['./client-panel.component.css'],
  providers: [SidenavService]
})
export class ClientPanelComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
    console.log(this.sidenavService.getSidenav());
  }

}
