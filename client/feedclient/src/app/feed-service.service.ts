import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feed } from './feed.model';
import { Record } from './record.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FeedServiceService {
  feeds: Feed[] = [];

  private baseUrl = 'http://localhost:4100';

  constructor(private http: HttpClient) { }

  getFeedStatus(): Observable<Feed[]> {
  // getFeedStatus(): string {
    // return 'hello';
    const url = this.baseUrl;
    return this.http
      .get(url)
      .pipe(map((feeds: object[]) => feeds.map(feed => Feed.parse(feed))));
  }

  getHistory(): Observable<Record[]> {
    const url = this.baseUrl + '/history';
    return this.http
      .get(url)
      .pipe(map((records: object[]) => records.map(record => Record.parse(record))));
  }
}
