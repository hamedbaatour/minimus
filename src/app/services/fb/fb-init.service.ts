import {Injectable} from '@angular/core';
import {AngularFireLiteAuth, AngularFireLiteFirestore} from 'angularfire-lite';
import {first, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

// Used so that we can show the how-to-setup page without Firebase throwing errors
@Injectable({
  providedIn: 'root'
})
export class FbInitService {

  isAuth() {
    return of(false);
  }

  userEmail() {
    return of('');
  }
}



