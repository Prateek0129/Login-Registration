import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { HttpService } from './http.service';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { CreateComponent } from './homepage/create/create.component';
import { TakePollComponent } from './homepage/take-poll/take-poll.component';
import { ViewPollComponent } from './homepage/view-poll/view-poll.component';
@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    CreateComponent,
    TakePollComponent,
    ViewPollComponent
  ],
  providers: [
    LoginService,
    RegisterService,
    HttpService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
