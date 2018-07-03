import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FormulaireComponent } from './formulaire/formulaire.component';
import { ValidationPageComponent} from './validation-page/validation-page.component';
import { QuiComponent } from './qui/qui.component';
import { LegaleComponent } from './legale/legale.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  { path: '', redirectTo: 'formulaire', pathMatch: 'full'},
  { path: 'formulaire', component: FormulaireComponent },
  { path: 'validation', component: ValidationPageComponent},
  { path: 'qui', component: QuiComponent},
  { path: 'legale', component: LegaleComponent},
  { path: 'contacts', component: ContactsComponent},
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