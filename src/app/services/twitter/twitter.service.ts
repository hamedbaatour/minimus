import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Status {
  text: string;
  created_at: string;
  user: {
    name: string;
    profile_image_url_https: string;
    screen_name: string;
  };
}

interface TweetResponse {
  result: {
    statuses: Status[];
  };
}

export interface Tweet {
  text: string;
  date: string;
  user: {
    name: string;
    photo: string;
    handle: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TwitterService {
  http = inject(HttpClient);

  fetchTweets(city: string): Observable<Tweet[]> {
    return this.http
      .post<TweetResponse | null>('https://us-central1-minimus-weather.cloudfunctions.net/tweets', {
        data: { q: `${city} Weather` },
      })
      .pipe(
        map(res => res?.result?.statuses ?? []),
        filter(tweets => tweets.some(tweet => tweet.text && tweet.text.match(/weather/g))),
        map(tweets =>
          tweets.map(tweet => ({
            text: tweet.text,
            date: tweet.created_at,
            user: {
              name: tweet.user.name,
              photo: tweet.user.profile_image_url_https,
              handle: tweet.user.screen_name,
            },
          }))
        ),
        map(tweets => tweets.slice(0, 4))
      );
  }
}
