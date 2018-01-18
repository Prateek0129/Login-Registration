import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { CreateComponent } from './homepage/create/create.component';
import { ViewComponent } from './homepage/view/view.component';
import { TakeComponent } from './homepage/take/take.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'homepage', canActivate: [AuthGuard], component: HomepageComponent, children: [
    { path: 'create', component: CreateComponent},
    { path: 'view', component: ViewComponent},
    { path: 'take', component: TakeComponent},
  ]}
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
   RouterModule.forRoot(routes),
  ]
})

export class AppRoutingModule { }
