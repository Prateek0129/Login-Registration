import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouteAuthGuard } from './routeAuth.guard';
import { CreateComponent } from './homepage/create/create.component';
import { ViewPollComponent } from './homepage/view-poll/view-poll.component';
import { TakePollComponent } from './homepage/take-poll/take-poll.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage/create', pathMatch: 'full', canActivate: [RouteAuthGuard]},
  // { path: '', redirectTo: '/login', pathMatch: 'full'},
  // { path: 'login', canActivate: [RouteAuthGuard], redirectTo:'homepage/create'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'homepage', redirectTo: 'homepage/create', pathMatch: 'full'},
  { path: 'homepage', canActivate: [RouteAuthGuard], component: HomepageComponent, children: [
    { path: 'create', component: CreateComponent},
    { path: 'viewpoll', component: ViewPollComponent},
    { path: 'takepoll', component: TakePollComponent},
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
