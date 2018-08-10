import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { CreditCardDirectivesModule } from 'ng2-cc-library'

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatGridListModule,
  MatRadioModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule
} from "@angular/material";

import { FormulaireComponent } from './formulaire/formulaire.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { QuiComponent } from './qui/qui.component';
import { LegaleComponent } from './legale/legale.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { ClientPanelComponent } from './client-panel/client-panel.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { ClientListeComponent } from './client-liste/client-liste.component';
import { EmailComponent } from './email/email.component';
import { DialogComponent } from './dialog/dialog.component';
import { ValidationDialogComponent } from './validation-dialog/validation-dialog.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ChangerMdpComponent } from './changer-mdp/changer-mdp.component';
import{ SidenavService} from './services/sidenav.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PayementComponent } from './payement/payement.component';

@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    FooterComponent,
    HeaderComponent,
    FrontPageComponent,
    FormContainerComponent,
    QuiComponent,
    LegaleComponent,
    ContactsComponent,
    AdminPanelComponent,
    LoginComponent,
    ClientPanelComponent,
    HeaderAdminComponent,
    ClientListeComponent,
    EmailComponent,
    DialogComponent,
    ValidationDialogComponent,
    AddAdminComponent,
    ChangerMdpComponent,
    SidenavComponent,
    PayementComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatGridListModule,
    MatRadioModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    CreditCardDirectivesModule,
    FlexLayoutModule
  ],
  entryComponents: [ClientListeComponent, DialogComponent,FormulaireComponent,ValidationDialogComponent],
  providers: [SidenavService,MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }