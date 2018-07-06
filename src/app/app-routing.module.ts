import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from './front-page/front-page.component';
import { ValidationPageComponent} from './validation-page/validation-page.component';
import { QuiComponent } from './qui/qui.component';
import { LegaleComponent } from './legale/legale.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'front-page', pathMatch: 'full'},
  { path: 'front-page', component: FrontPageComponent },
  { path: 'validation', component: ValidationPageComponent},
  { path: 'qui', component: QuiComponent},
  { path: 'legale', component: LegaleComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: ''}
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ 
    RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule {}