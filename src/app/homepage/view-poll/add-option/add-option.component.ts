import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../http.service';

@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.css']
})
export class AddOptionComponent implements OnInit {
@Input() pollId: string;
showForm:boolean = false;
submitSpin:boolean;
errorMessage:string;
successMessage:string;
constructor(public httpService: HttpService) { }

  ngOnInit() {
  }

  showFormFunc() {
    this.showForm = true;
  }

  addOption(newOption) {
    // console.log(newOption.value);
    this.submitSpin = true;
    this.httpService.addOption(newOption.value).then((data) => {
      this.submitSpin = false;
      this.successMessage = "Option  Submitted";
      setTimeout(() => {
      this.showForm = false;
      this.successMessage = "";
      }, 2000);
    }).catch((error)=> {
      this.submitSpin = false;
      this.errorMessage = error;
    })

  }
}