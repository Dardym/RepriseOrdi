import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FormulaireComponent } from './formulaire/formulaire.component';

const routes: Routes = [
  { path: 'formulaire', component: FormulaireComponent }
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ 
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    HttpClientModule
     ]
})
export class AppRoutingModule {}