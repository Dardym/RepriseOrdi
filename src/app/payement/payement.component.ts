import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CreditCardValidator } from 'ng2-cc-library';
import { THIS_EXPR } from '../../../node_modules/@angular/compiler/src/output/output_ast';
import { AdminService } from '../services/admin-service';
import { ValidationDialogComponent } from '../validation-dialog/validation-dialog.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import{MAT_DIALOG_DATA} from '@angular/material'


@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css'],
  providers:[ValidationDialogComponent]
})
export class PayementComponent implements OnInit {
  
  paymentForm: FormGroup;
  
  private cvc: Number;
  private cardNumber: Number;
  private expirationDate: Date;
  private nom: string;
  private adresse: string;
  private postal: Number;
  private ville: string;

  private cardToken: any;

  public message: string;

  constructor(
    private _zone: NgZone,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router:Router,
    public dialog: MatDialog,
    private validationDialog:ValidationDialogComponent
  ) { }



  ngOnInit() {

    this.paymentForm = this.formBuilder.group({
      'nom': [null, Validators.required],
      'adresse': [null, Validators.required],
      'postal': [null, Validators.required],
      'ville': [null, Validators.required],
      'email': [null, Validators.required],
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]]

    });
  }



  onFormSubmit(form: any) {
    this.getToken(form);
  }

  getToken(form: any) {

    let mois = form.expirationDate.split('/')[0].substring(0, 2);
    let annee = form.expirationDate.split('/')[1].substring(1, 3);
    (<any>window).Stripe.card.createToken({
      number: form.creditCard,
      exp_month: mois,
      exp_year: annee,
      cvc: form.cvc
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
         console.log(`Success! Card token ${response.card.id}.`);

          let data = {
            token: response.card.id,
            data: {
              nom: form.nom,
              adresse: form.adresse,
              ville: form.ville,
              postal: form.postal,
              email: form.email,
              numero: "3"
            },
            offre:"2"
          }
          this.adminService.sendPaymentInfo(data).subscribe(res => {
            console.log(res);
            this.openDialog();
          }, (err) => {
            console.log(err);
            this.openDialog();
          });
        }
        else{
          console.log("ah, c'est le problème serveur");
        }
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ValidationDialogComponent, {
      height: '350px',
      width: '',
      data:{
        title: "Vos informations banquaires ont bien été transmises.",
        texte: "Votre argent vous sera viré sur votre carte dès que nous recevrons votre colis."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    });
  }

}
