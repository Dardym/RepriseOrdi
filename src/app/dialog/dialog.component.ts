import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AdminService } from '../services/admin-service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  texte:string="Pour l'instant le texte est pas fou.";

  constructor(private adminService:AdminService) {}

  ngOnInit(){
    /*this.adminService.getEmail().subscribe(res => {
      console.log(res);
      this.texte = res;
    }, err => {
      console.log(err);
    });*/
  }

}
