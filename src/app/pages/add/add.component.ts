import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherService} from '../../services/weather/weather.service';
import {FbService} from '../../services/fb/fb.service';
import {first} from 'rxjs/operators';
import {FormsModule} from '@angular/forms';
import {NguiAutoCompleteModule} from 'ngxui-auto-complete';
import {NgClass} from '@angular/common';
import {WeatherCardComponent} from '../../ui/weather-card/weather-card.component';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css'],
    standalone: true,
    imports: [FormsModule, NguiAutoCompleteModule, WeatherCardComponent, NgClass]
})
export class AddComponent implements OnInit, OnDestroy {
  http = inject(HttpClient);
  weather = inject(WeatherService);
  fb = inject(FbService);

  temp?: number;
  city = 'Rome';
  state?: string;
  capitals: string[] = [];
  selectedCity: string = '';
  cardCity?: any;
  showNote = false;
  followedCM = false;
  sub1!: Subscription;

  ngOnInit() {
    // getting the city placeID
    this.weather.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });

    this.http.get<any[]>('https://restcountries.eu/rest/v2/all').pipe((first())).subscribe((countries: Array<any>) => {
      countries.forEach((country: any) => {
        if (country.capital.length) {
          this.capitals.push(country.capital as string);
        }
      });
      this.capitals.sort();
    });

    this.sub1 = this.fb.getCities().subscribe((cities: any) => {
      Object.values(cities).forEach((city: any) => {
        if (city.name === 'Rome') {
          this.followedCM = true;
        }
      });
    });
  }

  selectCity(city: string | {leading: number}) {
    if (typeof city === 'string' && this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else if (typeof city === 'object' && city.leading > 0) {
      this.showNote = true;
    }
  }

  addCityOfTheMonth() {
    this.fb.addCity('Rome').subscribe(() => {
      this.followedCM = true;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
