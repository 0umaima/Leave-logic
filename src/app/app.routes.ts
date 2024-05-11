import { ListDepartementsComponent } from './list-departements/list-departements.component';
import { EmployeeComponent } from './employe-add/employe-add.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LayoutComponentComponent } from './layout/layout-component.component';
import { RequestLeaveComponent } from './request-leave/request-leave.component';
import { ListeCongesComponent } from './liste-conges/liste-conges.component';
import { ListeEmployesComponent } from './liste-employes/liste-employes.component';
import { ListeDemandesComponent } from './liste-demandes/liste-demandes.component';
import { DepartementAddComponent } from './departement-add/departement-add.component';
import { EmployeeModifyComponent } from './employee-modify/employee-modify.component';

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
      { path: 'employe-add', component: EmployeeComponent },
       {path:'employee-modify', component: EmployeeModifyComponent},
      {path:  'demandes', component: ListeDemandesComponent},

      {path : 'departments-add', component: DepartementAddComponent},
      {path: 'departments', component: ListDepartementsComponent}
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
