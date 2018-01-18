import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {
  options: string;
  constructor(private http: HttpClient, public router: Router) { }
  onLogin(post) {

    return new Promise((resolve, reject) => {
      this.http.get(environment['apiBase'] + '/login', {
        params: new HttpParams().set('username', post.email).set('password', post.password)
      })
        .subscribe(
        (data) => {
          if (!data['error']) {
            resolve(data['token']);
            localStorage.setItem('currentUser', data['token']);
          } else {
            reject(data['data']);
            localStorage.setItem('currentUser', null);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            console.log(`Backend returned code $(err.status)`);
          }
        }
        );
    })
  }

  onRegister(post) {
    return new Promise((resolve, reject) => {
      this.http.get(environment['apiBase'] + '/add_user', {
        params: new HttpParams().set('username', post.email).set('password', post.password).set('role', post.role)
      })
        .subscribe((data) => {
          resolve(data['data']['id']);
          if (!data['error']) {
            resolve(data['data']['id']);
            localStorage.setItem('currentUser', data['data']['id']);
          } else {
            reject(data['message']);
            localStorage.setItem('currentUser', null);
          }
        });
    })
  }

  currentUser() {
    if (localStorage.getItem('currentUser') != "null") {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.setItem('currentUser', null);
    this.router.navigate(['/']);
  }
  createPoll(data) {
    return new Promise((resolve, reject) => {
      this.options = data.option1 + "____" + data.option2 + "____" + data.option3 + "____" + data.option4;
      this.http.get(environment['apiBase'] + '/add_poll', {
        params: new HttpParams().set('title', data.title).set('options', this.options)
      })
        .subscribe((data) => {
          if(!data['error'])
          resolve(true);
        });
    })
  }
}
