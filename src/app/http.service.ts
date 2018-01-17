import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class HttpService {
  url:string = "https://secure-refuge-14993.herokuapp.com";
  constructor(private http: HttpClient) { }
  onLogin(post) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/login`, {
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
      this.http.get(`${this.url}/add_user`, {
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
