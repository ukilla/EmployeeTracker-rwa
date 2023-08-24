import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DepartmentsComponent } from './departments/departments.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HeaderComponent, outlet: 'header' },
  { path: '', component: MainComponent },
  { path: 'employees', component: EmployeeListComponent },
  {path: 'departments', component:DepartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
