import { importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app-routing.module';
import { NguiAutoCompleteModule } from 'ngxui-auto-complete';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { provideRouter } from "@angular/router";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule, NguiAutoCompleteModule, FormsModule),
    provideFirebaseApp(() => initializeApp(environment.config)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
  ]
}).catch(err => console.error(err));
