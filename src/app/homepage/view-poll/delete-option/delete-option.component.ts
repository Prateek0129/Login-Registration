import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../http.service';

@Component({
  selector: 'app-delete-option',
  templateUrl: './delete-option.component.html',
  styleUrls: ['./delete-option.component.css']
})
export class DeleteOptionComponent implements OnInit {
  @Input() pollId:string;
  @Input() pollText:string;
  @Input() pollVote:number;
  deleteSpinner:boolean;
  errorMessage:string;
  constructor(public httpService: HttpService) { }

  ngOnInit() {
  }
  deleteOption(pollId,pollText,pollVote) {
    this.deleteSpinner = true;
    this.httpService.deleteOption(pollId,pollText,pollVote).then(()=>{
    this.deleteSpinner = false;
    }).catch((data)=>{
      this.errorMessage = data;
    });
  }
}
