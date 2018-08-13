import { Component, OnInit,Inject, Optional } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-validation-dialog',
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.css']
})
export class ValidationDialogComponent implements OnInit {

  private title:string = "Informations envoyés !";
  private texte:string = "Votre demande a bien été prise en compte. Vous allez être contacté sous peu par l'un de nos conseillés. Pensez à regarder vos mails !";
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.texte = this.data.texte;
  }

}
