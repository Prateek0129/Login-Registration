import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { CreateComponent } from './homepage/create/create.component';
import { ViewPollComponent } from './homepage/view-poll/view-poll.component';
import { TakePollComponent } from './homepage/take-poll/take-poll.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'homepage', canActivate: [AuthGuard], component: HomepageComponent, children: [
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
