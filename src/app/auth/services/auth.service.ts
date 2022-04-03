import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { UserData } from '../interface/interface';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData!: UserData;

  constructor( private auth: AngularFireAuth,
               private router: Router ) {
                 auth.authState
                   .subscribe( user => {
                     if( user !== null ) {
                      this.userData = {
                        email: user.email!,
                        uid: user.uid!
                      }
                    }
                   });
               }

  register( email: string, password: string ) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    return this.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider() )
    // return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
    this.router.navigateByUrl('auth');
  }

}

