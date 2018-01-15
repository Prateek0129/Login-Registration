import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { patternValidator } from '../shared/pattern-validator';
import { PasswordValidation } from '../shared/password-match';
import { passwordPattern } from '../shared/password-pattern';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  spin:boolean = false;
  registerForm: FormGroup;

  constructor(public loginService: LoginService ) { }

  ngOnInit() {
    this.createForm();
  }
  private createForm() {
    this.registerForm = new FormGroup({
      email:            new FormControl('',[Validators.required,patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password:         new FormControl('',[Validators.required,passwordPattern(/^(?=^.{4,8}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)]),
      confirmPassword:  new FormControl('',[Validators.required]),
      role:             new FormControl('',Validators.required),
    }, PasswordValidation.MatchPassword);
  }

  onRegister(post) {
    this.spin = true
    this.loginService.onRegister(post).then(()=>{
    this.spin = false;
    });
  }
}
