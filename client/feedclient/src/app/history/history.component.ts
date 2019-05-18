import { Component, OnInit } from '@angular/core';
import { FeedServiceService } from '../feed-service.service';
import { Record } from '../record.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  records: Record[] = [];
  constructor(private feedServiceService: FeedServiceService) { }

  ngOnInit() {
    this.retrieveHistory();
  }

  retrieveHistory() {
    this.feedServiceService.getHistory()
    .subscribe(records => this.records = records);
  }

}
