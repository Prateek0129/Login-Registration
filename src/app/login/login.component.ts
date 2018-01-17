import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { patternValidator } from '../shared/pattern-validator';
import { passwordPattern } from '../shared/password-pattern';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: any;
  spin: boolean = false;
  loginForm: FormGroup;

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.createForm();
  }
  private createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required, passwordPattern(/^(?=^.{4,8}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)]),
    });
  }

  onLogin(post) {
    this.spin = true;
    this.loginService.onLogin(post).then(() => {
      this.spin = false;
    }).catch((message) => {
      this.loginError = message;
      this.spin = false;
      setTimeout(() => {
        this.loginError = null;
      }, 3000);
    })
  }
}
