import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  private contactForm: FormGroup;

  constructor(private apiService: ApiService ,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      'nom': [null, Validators.required],
      'email': [null, Validators.required],
      'sujet': [null, Validators.required],
      'message': [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    console.log("dans le form : "+form);
    this.apiService.sendEmailContact(form).subscribe(res => {
      if(res.success){
        
      }
    }, (err) => {
      
    });
    
  }

}
