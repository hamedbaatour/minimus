import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather/weather.service';
import { UiService } from '../../services/ui/ui.service';
import { first } from 'rxjs/operators';
import { FbService } from '../../services/fb/fb.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { ErrorComponent } from '../error/error.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  standalone: true,
  imports: [NgClass, ErrorComponent, AsyncPipe],
})
export class WeatherCardComponent {
  weather = inject(WeatherService);
  router = inject(Router);
  ui = inject(UiService);
  fb = inject(FbService);

  @Input() set city(city: string) {
    this.cityName = city;
    this.weather
      .getWeather(city)
      .pipe(first())
      .subscribe(
        payload => {
          this.state = payload.weather[0].main;
          this.temp = Math.ceil(payload.main.temp);
        },
        err => {
          this.errorMessage = err.error.message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    this.weather
      .getForecast(city)
      .pipe(first())
      .subscribe(
        payload => {
          this.maxTemp = Math.round(payload[0].main.temp);
          this.minTemp = Math.round(payload[0].main.temp);
          for (const res of payload) {
            if (new Date().toLocaleDateString('en-GB') === new Date(res.dt_txt).toLocaleDateString('en-GB')) {
              this.maxTemp = res.main.temp > this.maxTemp ? Math.round(res.main.temp) : this.maxTemp;
              this.minTemp = res.main.temp < this.minTemp ? Math.round(res.main.temp) : this.minTemp;
            }
          }
        },
        err => {
          this.errorMessage = err.error.message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
  }

  @Input() addMode?: boolean;
  @Output() cityStored = new EventEmitter();

  citesWeather?: object;
  state?: string | null;
  temp?: number | null;
  maxTemp?: number | null;
  minTemp?: number | null;
  errorMessage?: string;
  cityName?: string | null;
  cityAdded = false;
  darkMode$ = this.ui.darkModeState.pipe(takeUntilDestroyed());

  openDetails() {
    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }

  addCity() {
    if (!this.cityName) return;

    this.fb.addCity(this.cityName).subscribe(() => {
      this.cityName = null;
      this.maxTemp = null;
      this.minTemp = null;
      this.state = null;
      this.temp = null;
      this.cityAdded = true;
      this.cityStored.emit();
      setTimeout(() => (this.cityAdded = false), 2000);
    });
  }
}
