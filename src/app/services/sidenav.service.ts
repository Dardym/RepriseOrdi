import { Injectable } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material';

@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;

  public setSidenav(s: MatSidenav) {
    this.sidenav = s;
  }

  public getSidenav(){
    return this.sidenav;
  }

  public open() {
    return this.sidenav.open();
  }


  public close() {
    return this.sidenav.close();
  }

  public serviceToggle() {
    console.log("Dans le sidenavService: " + this.sidenav);
    return this.sidenav.toggle();
  }

}