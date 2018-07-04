import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormulaireService } from '../formulaire-service.service';
import { Client } from '../client';
import { Ordinateur } from '../ordinateur';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    
  }

}
