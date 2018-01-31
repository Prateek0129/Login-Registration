import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { promise } from 'selenium-webdriver';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

import * as _ from 'lodash';

@Injectable()
export class HttpService {
  options: string;
  key: string;
  newOptionKey: string;
  allVotes:any[];
  newLocalOption:any;
  deleteValue:any;
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
    if (localStorage.getItem('currentUser') != "null" && localStorage.getItem('currentUser') != null) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.setItem('currentUser', null);
    this.router.navigate(['/login']);

  }

  createPoll(data) {
    return new Promise((resolve, reject) => {
      this.options = data.option1 + "____" + data.option2 + "____" + data.option3 + "____" + data.option4;
      this.http.get(environment['apiBase'] + '/add_poll', {
        params: new HttpParams().set('title', data.title).set('options', this.options)
      })
        .subscribe((data) => {
          if (!data['error'])
            resolve(true);
        });
    })
  }

  viewPolls() {
    return new Promise((resolve, reject) => {
      this.http.get(environment['apiBase'] + '/list_polls').subscribe((data) => {
        this.allVotes = data['data'];
        resolve(data['data']);
      });
    })
  }

  getToken(){
    return localStorage.getItem('currentUser');
   }

  submitPoll(data) {
    return new Promise((resolve,reject) => {
      this.key = _.keys(data)[0];
      const headers = new HttpHeaders().set('access_token', this.getToken());
      const params = new HttpParams().set('id', this.key).set('option_text', data[this.key]);
      this.http.get(environment['apiBase'] + '/do_vote', {
        headers,
        params
      })
        .subscribe((data) => {
          if (!data['error']) resolve(this.key);
        });
    })
  }

  addOption(option) {
    return new Promise((resolve,reject) => {  
      this.newOptionKey = _.keys(option)[0];
      const params = new HttpParams().set('id',this.newOptionKey).set('option_text',option[this.newOptionKey]);
      this.http.get(environment['apiBase'] + '/add_new_option', {
        params
      })
      .subscribe((data) => {
        if(!data['error']){
          resolve(true);
          this.newLocalOption = {'option':option[this.newOptionKey],'vote':0};
          this.allVotes[_.findIndex(this.allVotes,{'_id':this.newOptionKey})]['options'].push(this.newLocalOption);
        } else {
          reject(data['data'])
        }
      })
    })
  }

  deleteOption(pollId,pollText,pollVote) {
    return new Promise((resolve,reject) => {
      const params = new HttpParams().set('id',pollId).set('option_text',pollText);
      this.http.get(environment['apiBase'] + '/delete_poll_option', {
        params
      }).subscribe((data)=> {
        if(!data['error']){
          resolve(true);
          this.deleteValue = {'option':pollText,'vote':pollVote}
          _.remove(this.allVotes[_.findIndex(this.allVotes,{'_id':pollId})]['options'],this.deleteValue);
        } else {
          reject(data['data'])
        }
      })
  })
  }

  onUpdate(id,title) {
    return new Promise((resolve,reject)=> {
      const params =  new HttpParams().set('id',id).set('title',title);
      this.http.get(environment['apiBase'] + '/update_poll_title',{
        params
      }).subscribe((data)=> {
        if(!data['error']){
          resolve(true); 
        } else {
          reject(data['data'])
        }
      })
    })
  }

  onDelete(id) {
    return new Promise((resolve,reject)=> {
      const params =  new HttpParams().set('id',id);
      this.http.get(environment['apiBase'] + '/delete_poll',{
        params
      }).subscribe((data)=> {
        if(!data['error']){
          resolve(true); 
        } else {
          reject(data['data'])
        }
      })
    })
  }

}
