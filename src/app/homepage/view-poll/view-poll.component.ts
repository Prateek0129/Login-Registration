import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {

  constructor(public httpService: HttpService) { }
  polls: any;
  spin: boolean;
  ngOnInit() {
    this.spin = true;
    this.httpService.viewPolls().then((data) => {
      this.spin = false;
      this.polls = data;
      console.log(this.polls)
    });
  }

}
