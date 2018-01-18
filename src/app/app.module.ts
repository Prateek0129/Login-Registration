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
import { CreateComponent } from './homepage/create/create.component';
import { ViewComponent } from './homepage/view/view.component';
import { TakeComponent } from './homepage/take/take.component';
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
    ViewComponent,
    TakeComponent
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
