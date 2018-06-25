import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormulaireComponent }      from './formulaire/formulaire.component';

const routes: Routes = [
  { path: 'formulaire', component: FormulaireComponent }
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}