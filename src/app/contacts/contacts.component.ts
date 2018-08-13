import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ValidationDialogComponent } from '../validation-dialog/validation-dialog.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import{MAT_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers:[
    ValidationDialogComponent
  ]
})
export class ContactsComponent implements OnInit {

  private contactForm: FormGroup;

  constructor(private router:Router,public dialog: MatDialog, private apiService: ApiService ,private formBuilder: FormBuilder, private validationDialog:ValidationDialogComponent) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      'nom': [null, Validators.required],
      'email': [null, Validators.required],
      'sujet': [null, Validators.required],
      'message': [null, Validators.required]
    });
    
  }

  onFormSubmit(form: any) {
    this.apiService.sendEmailContact(form).subscribe(res => {
      console.log(res);
      if(res.success){
        this.openDialog();
        console.log("c'est un succé !");
      }else{

      }
    }, (err) => {
      
    });
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(ValidationDialogComponent, {
      height: '350px',
      width: '',
      data:{
        title:"Votre demande a bien été pris en compte !",
        texte:"Nous vous répondrons par mail dès que possible."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    });
  }

}
