import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { patternValidator } from '../shared/pattern-validator';
import { PasswordValidation } from '../shared/password-match';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  registerForm: FormGroup;

  constructor( ) { }

  ngOnInit() {
    this.createForm();
  }
  private createForm() {
    this.registerForm = new FormGroup({
      email:            new FormControl('',[Validators.required,patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password:         new FormControl('',[Validators.required]),
      confirmPassword:  new FormControl('',[Validators.required]),
    }, PasswordValidation.MatchPassword);
  }
}
