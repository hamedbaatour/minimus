import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;

  today: string;

  day1Name: string;
  day1State: string;
  day1Temp: number;


  day2Name: string;
  day2State: string;
  day2Temp: number;

  day3Name: string;
  day3State: string;
  day3Temp: number;

  day4Name: string;
  day4State: string;
  day4Temp: number;

  day5Name: string;
  day5State: string;
  day5Temp: number;

  constructor(public activeRouter: ActivatedRoute, public weather: WeatherService) {
  }

  ngOnInit() {

    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];

    this.activeRouter.paramMap.subscribe((route: any) => {

      this.city = route.params.city;
      this.weather.getWeatherState(this.city).subscribe((state) => this.state = state);
      this.weather.getCurrentTemp(this.city).subscribe((temperature) => this.temp = temperature);
      this.weather.getCurrentHum(this.city).subscribe((humidity) => this.hum = humidity);
      this.weather.getCurrentWind(this.city).subscribe((windspeed) => this.wind = windspeed);
      this.weather.getForecast(this.city).subscribe((data: any) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          const date = new Date(data[i].dt_txt).getDay();
          console.log(days[date]);
          if (((date === todayNumberInWeek + 1) || (todayNumberInWeek === 6 && date === 0)) && !this.day1Name) {
            this.day1Name = days[date];
            this.day1State = data[i].weather[0].main;
            this.day1Temp = Math.round(data[i].main.temp);

          } else if (!!this.day1Name && !this.day2Name && days[date] !== this.day1Name) {
            this.day2Name = days[date];
            this.day2State = data[i].weather[0].main;
            this.day2Temp = Math.round(data[i].main.temp);

          } else if (!!this.day2Name && !this.day3Name && days[date] !== this.day2Name) {
            this.day3Name = days[date];
            this.day3State = data[i].weather[0].main;
            this.day3Temp = Math.round(data[i].main.temp);

          } else if (!!this.day3Name && !this.day4Name && days[date] !== this.day3Name) {
            this.day4Name = days[date];
            this.day4State = data[i].weather[0].main;
            this.day4Temp = Math.round(data[i].main.temp);

          } else if (!!this.day4Name && !this.day5Name && days[date] !== this.day4Name) {
            this.day5Name = days[date];
            this.day5State = data[i].weather[0].main;
            this.day5Temp = Math.round(data[i].main.temp);

          }
        }
      });

    });

  }

}

