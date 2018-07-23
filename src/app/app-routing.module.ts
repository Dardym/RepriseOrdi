import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from './front-page/front-page.component';
import { QuiComponent } from './qui/qui.component';
import { LegaleComponent } from './legale/legale.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { ClientPanelComponent } from './client-panel/client-panel.component';
import { AuthGuard } from './services/auth-guard.service';
import { ClientListeComponent } from './client-liste/client-liste.component';
import { EmailComponent } from './email/email.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ChangerMdpComponent } from './changer-mdp/changer-mdp.component';

const routes: Routes = [

  {path: '', component: ClientPanelComponent, children:[
    //{ path: '**', redirectTo: '', pathMatch:'full'},
    { path: '', component: FrontPageComponent },
    { path: 'qui', component: QuiComponent},
    { path: 'legale', component: LegaleComponent},
    { path: 'contacts', component: ContactsComponent}
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate:[AuthGuard], children:[
    { path: '', redirectTo: 'admin-panel', pathMatch: 'full', canActivate:[AuthGuard]},
    { path: 'client-liste', component: ClientListeComponent, canActivate:[AuthGuard]},
    { path: 'email', component: EmailComponent, canActivate:[AuthGuard]},
    { path: "add-admin", component: AddAdminComponent, canActivate:[AuthGuard]},
    { path: "changer-mdp", component: ChangerMdpComponent, canActivate:[AuthGuard]}
  ]},
  // otherwise redirect to home
  { path: '**', redirectTo: '', pathMatch:'full'}
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ 
    RouterModule.forRoot(routes)
    ],
  providers: [AuthGuard]
  
})
export class AppRoutingModule {}