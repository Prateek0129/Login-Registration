import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createPollFormview: FormGroup;
  spin: boolean;
  message: string = null;
  submit: boolean;
  constructor(public httpService: HttpService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createPollForm();
  }

  private createPollForm() {
    this.createPollFormview = this.fb.group({
      title: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
    }, {
      validator: (formGroup: FormGroup) => {
        return this.validateForm(formGroup);
      }
      });
  }

  validateForm(formgroup: FormGroup) {
    if (formgroup.controls["title"].value && (formgroup.controls["option1"].value || formgroup.controls["option2"].value || formgroup.controls["option3"].value || formgroup.controls["option4"].value)) {
      return null;
    }
    else {
      return { validateForm: true };
    }
  }


  createPoll(data) {
      this.spin = true;
      this.submit = true;
      this.httpService.createPoll(data).then((noerror) => {
        if(noerror) {
        this.message = "Your Pole Has Been SuccessFully Submitted";
        this.spin = false;
        this.createPollForm();
        setTimeout(() => {
          this.message = null;
          this.submit = false;
        }, 1000);
        }
    })
  }
}