import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../environments/environment';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }
  onLogin(post) {
    return new Promise((resolve, reject) => {
      this.http.get(environment['apiBase'] +'/login', {
        params: new HttpParams().set('username', post.email).set('password', post.password)
      })
        .subscribe(
        (data) => {
          if (!data['error']) {
            resolve();
          } else {
            reject(data['data']);
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
      this.http.get(environment['apiBase'] +'/add_user', {
        params: new HttpParams().set('username', post.email).set('password', post.password).set('role', post.role)
      })
        .subscribe((data) => { 
          if (!data['error']) {
            resolve();
          } else {
            reject(data['message']);
          }
        });
    })
  }
}
