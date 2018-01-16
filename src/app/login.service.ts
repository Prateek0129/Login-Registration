import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class LoginService {
  loginError:boolean;

  constructor(private http: HttpClient) { }
  onLogin(post) {
    return new Promise((resolve,reject)=>{
      this.http.get(' https://secure-refuge-14993.herokuapp.com/login', {
        params: new HttpParams().set('username', post.email).set('password', post.password)
     })
    .subscribe(
      (data)=>{
        resolve(true);
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
} 
