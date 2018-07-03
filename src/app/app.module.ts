import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

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
  MatRadioModule } from "@angular/material";

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

const appRoutes: Routes = [
  {
    path: 'formulaire',
    component: FormulaireComponent,
    data: { title: 'Formulaire' }
  },
  { path: '',
    redirectTo: '/formulaire',
    pathMatch: 'full'
  }
];

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
    AdminPanelComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
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
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }