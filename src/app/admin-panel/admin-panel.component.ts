import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
 
import { Admin } from '../metier/admin';
import { AdminService } from '../services/admin-service';
import { AuthenticationService } from '../services/authentification.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  admins: Admin[] = [];
 
  currentUser: Admin;
 
    constructor(private router:Router, private adminService: AdminService, private authenticationService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentAdmin'));
    }
 
    ngOnInit() {
        this.loadAllUsers();
        this.router.navigate(['/admin-panel/client-liste']);
    }
 
    /*deleteUser(id: number) {
        this.adminService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }*/
 
    private loadAllUsers() {
        this.adminService.getAll().pipe(first()).subscribe(admins => { 
            this.admins = admins; 
        });
    }

    onLogOut(): void{

        console.log("le bouton logout");
        this.authenticationService.logout()
          .pipe(first())
          .subscribe(
              () => {
                this.router.navigate(['/login']);
                  
              });
    }


}
