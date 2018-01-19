import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createPollFormview: FormGroup;
  spin:boolean;
  message:string = null;
  constructor(public httpService: HttpService) { }

  ngOnInit() {
    this.createPollForm();
  }

  private createPollForm() {
    this.createPollFormview = new FormGroup({
      title: new FormControl('', Validators.required),
      option1: new FormControl('', Validators.required),
      option2: new FormControl('', Validators.required),
      option3: new FormControl('', Validators.required),
      option4: new FormControl('', Validators.required),
    });
  }

  createPoll(data) {
    this.spin = true;
    this.httpService.createPoll(data).then((noerror) => {
      if(noerror) {
      this.message = "Your Pole Has Been SuccessFully Submitted";
      this.spin = false;
      setTimeout(() => {
        this.message = null;
        this.createPollForm();
      }, 3000);
      }
  })
}
}