import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CreditCardValidator } from 'ng2-cc-library';
import { THIS_EXPR } from '../../../node_modules/@angular/compiler/src/output/output_ast';
import { AdminService } from '../services/admin-service';
import { ValidationDialogComponent } from '../validation-dialog/validation-dialog.component';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material'
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css'],
  providers: [ValidationDialogComponent]
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

  private id:string;
  private client:any;

  constructor(
    private _zone: NgZone,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    public dialog: MatDialog,
    private validationDialog: ValidationDialogComponent,
    private activatedRoute: ActivatedRoute,
    private apiService:ApiService
  ) { }



  ngOnInit() {

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.apiService.getClient(this.id).subscribe((rep) => {
        if(!rep.success){
          this.router.navigate(['/']);
        }else{
          this.client = rep.client;
          if(this.client.paye==true){
            this.router.navigate(['/']);
          }else{
            console.log(this.client);
          }
        }
      }),
      (err) => {
        console.log(err);
      }
    });

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
          let data = {
            token: response.id,
            data: {
              nom: form.nom,
              adresse: form.adresse,
              ville: form.ville,
              postal: form.postal,
              email: form.email,
              numero: this.client.numero
            },
            offre: this.client.offre
          }
          this.adminService.sendPaymentInfo(data).subscribe(res => {
            console.log(res);
            this.openDialog();
          }, (err) => {
            this.openDialog();
            console.log("dans le err c'est chiant");
            console.log(err);
          });
        }
        else {
          console.log("ah, c'est le problème serveur");
        }
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ValidationDialogComponent, {
      height: '350px',
      width: '',
      data: {
        title: "Vos informations banquaires ont bien été transmises.",
        texte: "Votre argent vous sera viré sur votre carte dès que nous recevrons votre colis."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    });
  }

}
