import { Injectable } from '@angular/core';
import {
  Auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: any;

  constructor(private afAuth: Auth, private router: Router) {}

  returnUser(): Observable<any> {
    return new Observable<any>((observer) => {
      this.afAuth.onAuthStateChanged((user) => {
        observer.next(user);
        observer.complete();
      });
    });
  }

  signInWithGoogle(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      signInWithPopup(this.afAuth, new GoogleAuthProvider())
        .then(() => {
          this.router.navigate(['/dashboard']);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  signInWithGithub(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      signInWithPopup(this.afAuth, new GithubAuthProvider())
        .then(() => {
          this.router.navigate(['/dashboard']);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  signOut() {
    this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/authentication']);
      })
      .catch((error) => {
        console.error('Error during sign-out:', error);
      });
  }
}
