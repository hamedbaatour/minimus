import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherCardComponent} from './ui/weather-card/weather-card.component';
import {AddCardComponent} from './ui/add-card/add-card.component';
import {AddComponent} from './pages/add/add.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ErrorComponent} from './ui/error/error.component';
import {AngularFireLite} from 'angularfire-lite';
import {environment} from '../environments/environment';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {FormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import {HowToSetupComponent} from './pages/how-to-setup/how-to-setup.component';
import {FbService} from "./services/fb/fb.service";
import {FbInitService} from "./services/fb/fb-init.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    WeatherCardComponent,
    AddCardComponent,
    AddComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    HowToSetupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NguiAutoCompleteModule,
    FormsModule,
    environment.config.apiKey !== '' ? AngularFireLite.forRoot(environment.config) : [],
  ],
  providers: [
    environment.config.apiKey === '' ? {provide: FbService, useClass: FbInitService} : [],
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
