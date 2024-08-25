import { Injectable, inject } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {FbService} from '../services/fb/fb.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  fb = inject(FbService);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.fb.isAuth().pipe(map(
      auth => {
        if (!auth) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }
    ));
  }

}
