import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CreditCardValidator } from 'ng2-cc-library';
import { THIS_EXPR } from '../../../node_modules/@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css']
})
export class PayementComponent implements OnInit {

  paymentForm: FormGroup;

  private cvc:Number;
  private cardNumber:Number;
  private expirationDate:Date;
  private nom:string;
  private adresse:string;
  private postal:Number;
  private ville:string;

  private cardToken:any;

  public message:string;

  constructor(
    private _zone: NgZone,
    private formBuilder: FormBuilder
  ) { }

  

  ngOnInit() {

    this.paymentForm = this.formBuilder.group({
      'nom': [null, Validators.required],
      'adresse': [null, Validators.required],
      'postal': [null, Validators.required],
      'ville': [null, Validators.required],
      'email': [null,Validators.required],
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]] 

    });
  }



  onFormSubmit(form: any){
    this.getToken(form);
    console.log(this.message);
  }

  getToken(form:any) {
   
    let mois = form.expirationDate.split('/')[0].substring(0,2);
    let annee = form.expirationDate.split('/')[1].substring(1,3);
    console.log(mois+'/'+annee);
    (<any>window).Stripe.card.createToken({
      number: form.creditCard,
      exp_month: mois,
      exp_year: annee,
      cvc: form.cvc
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          this.message = `Success! Card token ${response.card.id}.`;
          console.log(this.message);
        } else {
          this.message = response.error.message;
          console.log(this.message);
        }
      });
    });
  }

}
