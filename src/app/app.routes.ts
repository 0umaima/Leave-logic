import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LayoutComponentComponent } from './layout/layout-component.component';
import { RequestLeaveComponent } from './request-leave/request-leave.component';
import { ListeCongesComponent } from './liste-conges/liste-conges.component';
import { ListeEmployesComponent } from './liste-employes/liste-employes.component';
import { ListeDemandesComponent } from './liste-demandes/liste-demandes.component';
import { RoleGuard } from './guards/role.guard';
import { EmployeeModifyComponent } from './employee-modify/employee-modify.component';

export const routes: Routes = [ {
    path: '',
    component: LayoutComponentComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {path:  'request', component: RequestLeaveComponent},
      {path:  'conges', component: ListeCongesComponent , canActivate: [ RoleGuard], data: { roles: ['Manager', 'HR'] }},
      {path:  'employes', component: ListeEmployesComponent, canActivate: [ RoleGuard], data: { roles: ['Manager'] }},
       {path:'employee-modify', component: EmployeeModifyComponent},
      {path:  'demandes', component: ListeDemandesComponent,  canActivate: [ RoleGuard], data: { roles: ['Manager' ] }},
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
