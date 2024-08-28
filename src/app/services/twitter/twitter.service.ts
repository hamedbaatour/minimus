import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  http = inject(HttpClient);

  fetchTweets(city: string) {
    return this.http.post<any>('https://us-central1-minimus-weather.cloudfunctions.net/tweets', {
      data: {q: `${city} Weather`}
    }).pipe(
      first(),
      map((res: any) => res && res.result ? res.result.statuses : []),
      filter((tweets: any[]) => tweets.some(tweet => tweet.text && tweet.text.match(/weather/g))),
      map((tweets: any[]) => tweets.map(tweet => ({
        text: tweet.text,
        date: tweet.created_at,
        user: {
          name: tweet.user.name,
          photo: tweet.user.profile_image_url_https,
          handle: tweet.user.screen_name
        }
      }))),
      map((tweets: any) => tweets.slice(0, 4)));
  }
}
