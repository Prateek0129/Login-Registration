import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

import * as _ from 'lodash';

import { PaginationService } from '../../pagination.service';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {

  constructor(public httpService: HttpService, public paginationService:PaginationService) { }
  allItems: any;
  pager:any = {};
  pagedItems: any[];
  spin: boolean;
  ngOnInit() {
    this.spin = true;
    this.httpService.viewPolls().then((data) => {
      this.spin = false;
      this.allItems = data;
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
}
