import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service'
import { Client } from '../metier/client'

@Component({
  selector: 'app-client-liste',
  templateUrl: './client-liste.component.html',
  styleUrls: ['./client-liste.component.css']
})
export class ClientListeComponent implements OnInit {

  listClient: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    
    this.listClient = this.apiService.getClients();

    for(var i=0;i<this.listClient.length;i++){
      console.log(this.listClient);
    }

  }

}
