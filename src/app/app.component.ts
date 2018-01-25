import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentPage;
  constructor(public httpService: HttpService, public router: Router) {
    if(!!this.httpService.currentUser() && (localStorage.getItem('currentPage'))=="takepoll") {
      this.router.navigate(['homepage/takepoll']);
    } 
    else if(!!this.httpService.currentUser() && (localStorage.getItem('currentPage'))=="viewpoll") {
      this.router.navigate(['homepage/viewpoll']);
    }
    else if(!!this.httpService.currentUser()) {
      this.router.navigate(['homepage/create']);
    // }
    // if(!!this.httpService.currentUser) {
    // this.currentPage = localStorage.getItem('currentPage');
    // console.log(this.currentPage,typeof(this.currentPage));
    //   this.router.navigate(['homepage/create'])
    // }
  }
}
