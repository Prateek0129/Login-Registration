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
import { MainService } from './main.service';
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
    HomepageComponent
  ],
  providers: [
    LoginService,
    RegisterService,
    HttpService,
    AuthGuard,
    MainService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
