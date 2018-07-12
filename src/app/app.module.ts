import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';

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
  MatButtonToggleModule } from "@angular/material";

import { FormulaireComponent } from './formulaire/formulaire.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { ValidationPageComponent } from './validation-page/validation-page.component';
import { QuiComponent } from './qui/qui.component';
import { LegaleComponent } from './legale/legale.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { ClientPanelComponent } from './client-panel/client-panel.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { ClientListeComponent } from './client-liste/client-liste.component';

@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    FooterComponent,
    HeaderComponent,
    FrontPageComponent,
    FormContainerComponent,
    ValidationPageComponent,
    QuiComponent,
    LegaleComponent,
    ContactsComponent,
    AdminPanelComponent,
    LoginComponent,
    ClientPanelComponent,
    HeaderAdminComponent,
    ClientListeComponent
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
    FlexLayoutModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }