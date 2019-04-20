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
  
  constructor(private feedServiceService: FeedServiceService) { }

  ngOnInit() {
  }

  getStatus() {
    console.log('clicked');
    // console.log(this.feedServiceService.getFeedStatus());
    this.feedServiceService.getFeedStatus()
      .subscribe(feeds => this.feeds = feeds);
  }

}
