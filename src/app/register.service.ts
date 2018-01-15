import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from "@angular/common/http"

@Injectable()
export class RegisterService {

  constructor(private http:HttpClient) { }
  onRegister(post) {
    return new Promise((resolve,reject)=>{
      this.http.get('https://secure-refuge-14993.herokuapp.com/add_user', {
      params: new HttpParams().set('username', post.email).set('password', post.password).set('role', post.role)
    })
    .subscribe((data)=>{resolve(true)});
    })
  }
}
