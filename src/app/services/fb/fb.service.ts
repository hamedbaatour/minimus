import { inject, Injectable } from '@angular/core';
import {filter, first, map, switchMap, tap} from 'rxjs/operators';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

interface User {
  email: string;
  uid: string;
}

function isUser(value: unknown): value is User {
  return !!value && typeof value === 'object' && 'uid' in value && 'email' in value;
}

interface City {
  name: string;
  added: string;
}

@Injectable({
  providedIn: 'root',
})
export class FbService {
  private auth: Auth = inject(Auth);
  private firestore = inject(Firestore);

  userEmail(): Observable<string | null> {
    return user(this.auth).pipe(map(x => (isUser(x) ? x.email : null)));
  }

  isAuth() {
    return user(this.auth).pipe(map(x => !!x));
  }

  signin(email: string, pass: string) {
    return from(signInWithEmailAndPassword(this.auth, email, pass));
  }

  signup(email: string, pass: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, pass));
  }

  signout() {
    return from(signOut(this.auth));
  }

  getCities(): Observable<City[]> {
    return user(this.auth).pipe(
      filter(isUser),
      map(x => (x as User).uid),
      switchMap((uid: string) => collectionData(collection(this.firestore, uid))),
      tap(x => console.log(x))
    );
  }

  addCity(name: string) {
    return user(this.auth).pipe(
      map(x => (x as User).uid),
      switchMap(uid =>
        addDoc(collection(this.firestore, `${uid}`), {
          name,
          added: new Date().toISOString(),
        })
      ),
      first()
    );
  }
}
