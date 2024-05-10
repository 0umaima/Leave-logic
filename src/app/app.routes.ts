import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LayoutComponentComponent } from './layout/layout-component.component';
import { RequestLeaveComponent } from './request-leave/request-leave.component';
import { ListeCongesComponent } from './liste-conges/liste-conges.component';
import { ListeEmployesComponent } from './liste-employes/liste-employes.component';
import { ListeDemandesComponent } from './liste-demandes/liste-demandes.component';

export const routes: Routes = [ {
    path: '',
    component: LayoutComponentComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent , canActivate: [AuthenticationGuard]},
      {path:  'request', component: RequestLeaveComponent},
      {path:  'conges', component: ListeCongesComponent},
      {path:  'employes', component: ListeEmployesComponent},
      {path:  'demandes', component: ListeDemandesComponent}

    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },];
