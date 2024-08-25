import {inject, Injectable} from '@angular/core';
import {first, map, switchMap} from 'rxjs/operators';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user} from "@angular/fire/auth";
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FbService {
  private auth: Auth = inject(Auth);
  private firestore = inject(Firestore);

  userEmail() {
    return user(this.auth).pipe(map(x => x.email));
  }

  isAuth() {
    return user(this.auth).pipe(map(x => !!x));
  }

  signin(email, pass) {
    return from(signInWithEmailAndPassword(this.auth, email, pass));
  }

  signup(email, pass) {
    return from(createUserWithEmailAndPassword(this.auth, email, pass));
  }

  signout() {
    return from(signOut(this.auth));
  }

  getCities() {
    return user(this.auth).pipe(map(x => x.uid)).pipe(switchMap((uid) => {
      return collectionData(collection(this.firestore, uid));
    }));
  }

  addCity(name: string) {
    return user(this.auth).pipe(map(x => x.uid))
      .pipe(switchMap((uid) => {
        return addDoc(collection(this.firestore, `${uid}/${name}`), {name, added: new Date()});
      }), first());
  }
}
