import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from './front-page/front-page.component';
import { ValidationPageComponent} from './validation-page/validation-page.component';
import { QuiComponent } from './qui/qui.component';
import { LegaleComponent } from './legale/legale.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', redirectTo: 'front-page', pathMatch: 'full'},
  { path: 'front-page', component: FrontPageComponent },
  { path: 'validation', component: ValidationPageComponent},
  { path: 'qui', component: QuiComponent},
  { path: 'legale', component: LegaleComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'admin-panel', component: AdminPanelComponent}
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ 
    RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule {}