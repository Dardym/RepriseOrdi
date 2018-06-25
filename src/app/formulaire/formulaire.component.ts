import { Component, OnInit, Input } from '@angular/core';
import { FormulaireService } from '../formulaire-service.service';
import { Client } from '../client';
import { Ordinateur } from '../ordinateur';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  @Input() client: Client = {
    id: 0,
    nom: '',
    email: '',
    ordinateur : {
      modele: '',
      marque: '',
      complet: false,
      fonctionnel: false,
      visuel: false
    }

  }

  constructor(private formulaireService : FormulaireService) { }

  ngOnInit() {
  }

  submit(): void {

    console.log(this.client);
  }


}
