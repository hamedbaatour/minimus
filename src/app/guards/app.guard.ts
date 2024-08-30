import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FbService } from '../services/fb/fb.service';
import { map } from 'rxjs/operators';

export const appGuard: CanActivateFn = () => {
  const fb = inject(FbService);
  const router = inject(Router);
  return fb.isAuth().pipe(map(auth => (auth ? true : router.createUrlTree(['/login']))));
};
