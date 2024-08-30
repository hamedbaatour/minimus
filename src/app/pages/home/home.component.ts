import { Component, inject } from '@angular/core';
import { FbService } from '../../services/fb/fb.service';
import { AsyncPipe } from '@angular/common';
import { WeatherCardComponent } from '../../ui/weather-card/weather-card.component';
import { AddCardComponent } from '../../ui/add-card/add-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [WeatherCardComponent, AddCardComponent, AsyncPipe],
})
export class HomeComponent {
  fb = inject(FbService);
  cities = this.fb.getCities();
}
