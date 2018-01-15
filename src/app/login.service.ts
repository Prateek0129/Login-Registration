import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { promise } from 'selenium-webdriver';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }
  onLogin(post) {
    return new Promise((resolve,reject)=>{
      this.http.get(' https://secure-refuge-14993.herokuapp.com/login', {
        params: new HttpParams().set('username', post.email).set('password', post.password)
     })
    .subscribe((data)=>{resolve(true)});
    }) 
  }
} 
