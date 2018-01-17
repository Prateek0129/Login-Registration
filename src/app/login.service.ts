import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class LoginService {

  constructor(private httpService: HttpService) { }
    onLogin(post) {
     return this.httpService.onLogin(post);
    }
} 
