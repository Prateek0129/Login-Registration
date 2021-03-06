import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { HttpService } from './http.service';
import { HomepageComponent } from './homepage/homepage.component';
import { RouteAuthGuard } from './routeAuth.guard';
import { CreateComponent } from './homepage/create/create.component';
import { TakePollComponent } from './homepage/take-poll/take-poll.component';
import { ViewPollComponent } from './homepage/view-poll/view-poll.component';
import { HeaderComponent } from './homepage/header/header.component';
import { SideMenuComponent } from './homepage/side-menu/side-menu.component';
import { PaginationService } from './pagination.service';
import { AddOptionComponent } from './homepage/view-poll/add-option/add-option.component';
import { DeleteOptionComponent } from './homepage/view-poll/delete-option/delete-option.component';
import { MyHttpInterceptor } from './interceptors/my-http-interceptor';
@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    CreateComponent,
    TakePollComponent,
    ViewPollComponent,
    HeaderComponent,
    SideMenuComponent,
    AddOptionComponent,
    DeleteOptionComponent,
  ],
  providers: [
    LoginService,
    RegisterService,
    HttpService,
    RouteAuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    PaginationService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
