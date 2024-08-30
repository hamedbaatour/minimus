import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-how-to-setup',
  templateUrl: './how-to-setup.component.html',
  styleUrls: ['./how-to-setup.component.css']
})
export class HowToSetupComponent implements OnInit {

  hasWeatherApiKey = environment.appID !== '';
  hasFirebaseConfig = environment.config.apiKey !== '';
  constructor() { }

  ngOnInit() {
  }

}
