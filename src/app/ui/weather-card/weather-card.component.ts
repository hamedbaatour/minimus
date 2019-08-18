import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {UiService} from '../../services/ui/ui.service';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {FbService} from '../../services/fb/fb.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  @Input() set city(city: string) {
    this.cityName = city;
    this.weather.getWeather(city)
      .pipe(first())
      .subscribe((payload) => {
        this.state = payload.weather[0].main;
        this.temp = Math.ceil(payload.main.temp);
      }, (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
    this.weather.getForecast(city)
      .pipe(first())
      .subscribe((payload) => {
        this.maxTemp = Math.round(payload[0].main.temp);
        this.minTemp = Math.round(payload[0].main.temp);
        for (const res of payload) {
          if (new Date().toLocaleDateString('en-GB') === new Date(res.dt_txt).toLocaleDateString('en-GB')) {
            this.maxTemp = res.main.temp > this.maxTemp ? Math.round(res.main.temp) : this.maxTemp;
            this.minTemp = res.main.temp < this.minTemp ? Math.round(res.main.temp) : this.minTemp;
          }
        }
      }, (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });

  }

  @Input() addMode;
  @Output() cityStored = new EventEmitter();
  citesWeather: Object;
  darkMode: boolean;
  sub1: Subscription;
  state: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  errorMessage: string;
  cityName;
  cityAdded = false;

  constructor(public weather: WeatherService,
              public router: Router,
              public ui: UiService,
              public fb: FbService) {
  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  openDetails() {
    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }

  addCity() {
    this.fb.addCity(this.cityName).subscribe(() => {
      this.cityName = null;
      this.maxTemp = null;
      this.minTemp = null;
      this.state = null;
      this.temp = null;
      this.cityAdded = true;
      this.cityStored.emit();
      setTimeout(() => this.cityAdded = false, 2000);
    });
  }


}
