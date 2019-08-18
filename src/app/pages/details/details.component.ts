import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {UiService} from '../../services/ui/ui.service';
import {concatMap} from 'rxjs/operators';
import {TwitterService} from '../../services/twitter/twitter.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  darkMode: boolean;
  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;
  today: string;
  daysForecast: Object;
  cityIllustrationPath: string;
  sub1: Subscription;
  sub2: Subscription;
  errorMessage: string;
  tweets$: Observable<any>;

  constructor(public twitter: TwitterService, public activeRouter: ActivatedRoute, public weather: WeatherService, public ui: UiService) {

  }

  ngOnInit() {

    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];
    this.sub2 = this.activeRouter.paramMap.pipe(concatMap((route: any) => {
        this.city = route.params.city;
        switch (this.city.toLowerCase()) {
          case 'paris':
            this.cityIllustrationPath = '../../../assets/cities/france.svg';
            break;
          case 'doha':
            this.cityIllustrationPath = '../../assets/cities/qatar.svg';
            break;
          case 'rabat':
            this.cityIllustrationPath = '../../assets/cities/rabat.svg';
            break;
          case 'tunis':
            this.cityIllustrationPath = '../../assets/cities/tunis.svg';
            break;
          case 'tokyo':
            this.cityIllustrationPath = '../../assets/cities/japan.svg';
            break;
          default:
            this.cityIllustrationPath = '../../assets/cities/default.svg';
        }
        return forkJoin(this.weather.getWeather(this.city), this.weather.getForecast(this.city));
      })
    ).subscribe((payload: any) => {
      this.state = payload[0].weather[0].main;
      this.temp = Math.ceil(Number(payload[0].main.temp));
      this.hum = payload[0].main.humidity;
      this.wind = Math.round(Math.round(payload[0].wind.speed));
      const dates = {};
      for (const res of payload[1]) {
        const date = new Date(res.dt_txt).toDateString().split(' ')[0];
        if (dates[date]) {
          dates[date].counter += 1;
          dates[date].temp += res.main.temp;
        } else {
          dates[date] = {
            state: res.weather[0].main,
            temp: res.main.temp,
            counter: 1
          };
        }
      }
      Object.keys(dates).forEach((day) => {
        dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
      });
      delete dates[Object.keys(dates)[0]];
      this.daysForecast = dates;
    }, (err) => {
      this.errorMessage = err.error.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2500);
    });

    this.tweets$ = this.twitter.fetchTweets(this.city);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
