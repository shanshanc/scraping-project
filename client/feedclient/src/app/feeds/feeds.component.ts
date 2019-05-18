import { Component, OnInit } from '@angular/core';
import { Feed } from '../feed.model';
import { FeedServiceService } from '../feed-service.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})

export class FeedsComponent implements OnInit {
  feeds: Feed[] = [];
  tableColumns: string[] = ['index', 'title', 'productId', 'price', 'brand'];
  
  constructor(private feedServiceService: FeedServiceService) { }

  ngOnInit() {
  }

  getStatus() {
    this.feedServiceService.getFeedStatus()
      .subscribe(feeds => this.feeds = feeds);
  }

}
