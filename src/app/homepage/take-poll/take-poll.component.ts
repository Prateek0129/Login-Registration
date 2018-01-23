import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import * as _ from 'lodash';

import { PaginationService } from '../../pagination.service';

@Component({
  selector: 'app-take-poll',
  templateUrl: './take-poll.component.html',
  styleUrls: ['./take-poll.component.css']
})
export class TakePollComponent implements OnInit {

  constructor(public httpService: HttpService, public paginationService: PaginationService) { }
  allItems: any;
  pager: any = {};
  pagedItems: any[];
  spin: boolean;
  message: string;
  id: Array<string> = [""];
  submitSpin:boolean;
  ngOnInit() {
    this.spin = true;
    this.httpService.viewPolls().then((data) => {
      this.spin = false;
      this.allItems = data;
      this.allItems = _.reverse(this.allItems);
      this.setPage(1);
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.paginationService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  submitPoll(option) {
    this.submitSpin = true;
    this.httpService.submitPoll(option.value).then((data:string) => {
      this.submitSpin = false;
       this.id.push(data);
      console.log(this.id);
      this.message = "Your Poll Has Been Successfully Submitted";
    })
  }
  isAdded(id) {
    if((_.indexOf(this.id,id))>-1) {
      return true;
    } else {
      return false;
    }
  }
}
