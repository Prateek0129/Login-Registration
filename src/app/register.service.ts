import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class RegisterService {

  constructor(private httpService: HttpService) { }
  onRegister(post) {
    return this.httpService.onRegister(post);
  }
}
