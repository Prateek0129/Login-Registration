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

  constructor(public httpService: HttpService, public paginationService: PaginationService) { }
  allItems: any;
  pager: any = {};
  pagedItems: any[];
  spin: boolean;
  updatePollId;
  errorMessage;
  updateSpin: boolean;
  deleteSpin:boolean;
  deleteId;
  count:number = 1;
  ngOnInit() {
    this.spin = true;
    this.httpService.viewPolls().then((data) => {
      this.spin = false;
      this.allItems = data;
      this.count = this.allItems.length;
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

  onUpdate(title) {
    this.updateSpin = true;
    this.httpService.onUpdate(this.updatePollId, title.value['update']).then((data) => {
      this.updateSpin = false;
      this.updatePollId = "";
    }).catch((data) => {
      this.errorMessage = data;
    });
  }
  
  doUpdate(id) {
    this.updatePollId = id;
  }

  onDelete(id) {
    this.deleteId = id;
    this.deleteSpin = true;
    _.pullAt(this.allItems,_.findIndex(this.allItems,{'_id':id}));
    this.pagedItems = this.allItems;
    this.count = this.allItems.length;    
    this.httpService.onDelete(id).then((data)=> {
      this.deleteSpin = false;
    }).catch((data) => {
      this.errorMessage = data;
    });
  }
}
