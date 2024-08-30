import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {FbService} from '../services/fb/fb.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate() {
    if (environment.appID === '' || environment.config.apiKey === '') {
      return this.router.createUrlTree(['/how-to-setup']);
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RedirectWhenSetupGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate() {
    if (environment.appID !== '' && environment.config.apiKey !== '') {
      return this.router.createUrlTree(['/']);
    } else {
      return true;
    }
  }
}
