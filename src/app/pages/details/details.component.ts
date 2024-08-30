import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WeatherService } from '../../services/weather/weather.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { UiService } from '../../services/ui/ui.service';
import { Tweet, TwitterService } from '../../services/twitter/twitter.service';
import { AsyncPipe, KeyValuePipe, NgClass } from '@angular/common';
import { ErrorComponent } from '../../ui/error/error.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface DetailInfo {
  counter: number;
  temp: number;
  state: string;
}

const CITY_IMAGE_MAP: Record<string, string> = {
  paris: 'cities/france.svg',
  doha: 'cities/qatar.svg',
  rabat: 'cities/rabat.svg',
  tunis: 'cities/tunis.svg',
  tokyo: 'cities/japan.svg',
};

const DEFAULT_CITY = 'cities/default.svg';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [NgClass, RouterLink, ErrorComponent, AsyncPipe, KeyValuePipe],
})
export class DetailsComponent implements OnInit, OnDestroy {
  twitter = inject(TwitterService);
  activeRouter = inject(ActivatedRoute);
  weather = inject(WeatherService);
  ui = inject(UiService);

  darkMode$ = this.ui.darkModeState.pipe(takeUntilDestroyed());
  city: string | null = null;
  state?: string;
  temp?: number;
  hum?: number;
  wind?: number;
  today?: string;
  daysForecast?: Record<string, DetailInfo>;
  cityIllustrationPath?: string;
  sub2?: Subscription;
  errorMessage?: string;
  tweets$?: Observable<Tweet[]>;

  ngOnInit() {
    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];
    this.city = this.activeRouter.snapshot.paramMap.get('city');

    if (this.city) {
      this.cityIllustrationPath = CITY_IMAGE_MAP[this.city!.toLowerCase()] ?? DEFAULT_CITY;
      this.tweets$ = this.twitter.fetchTweets(this.city!);
      this.sub2 = forkJoin([this.weather.getWeather(this.city!), this.weather.getForecast(this.city!)]).subscribe({
        next: ([weather, forecast]) => {
          this.state = weather.weather[0].main;
          this.temp = Math.ceil(Number(weather.main.temp));
          this.hum = weather.main.humidity;
          this.wind = Math.round(Math.round(weather.wind.speed));
          const dates: Record<string, { counter: number; temp: number; state: string }> = {};
          for (const res of forecast) {
            const date = new Date(res.dt_txt).toDateString().split(' ')[0];
            if (dates[date]) {
              dates[date].counter += 1;
              dates[date].temp += res.main.temp;
            } else {
              dates[date] = {
                state: res.weather[0].main,
                temp: res.main.temp,
                counter: 1,
              };
            }
          }
          Object.keys(dates).forEach(day => {
            dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
          });
          delete dates[Object.keys(dates)[0]];
          this.daysForecast = dates;
        },
        error: err => {
          this.errorMessage = err.error.message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2500);
        },
      });
    }
  }

  ngOnDestroy() {
    this.sub2?.unsubscribe();
  }
}
