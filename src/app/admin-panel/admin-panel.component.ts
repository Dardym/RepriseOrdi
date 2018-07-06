import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
 
import { Admin } from '../metier/admin';
import { AdminService } from '../services/admin-service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  admins: Admin[] = [];
 
  currentUser: Admin;
 
    constructor(private adminService: AdminService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentAdmin'));
    }
 
    ngOnInit() {
        this.loadAllUsers();
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

}
