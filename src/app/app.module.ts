import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
