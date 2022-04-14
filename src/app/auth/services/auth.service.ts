import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { UserData } from '../interface/interface';
import { Router } from '@angular/router';

import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: UserData = {
    name: '',
    email: '',
    url_Photo: '...'
  };

  constructor( private auth: AngularFireAuth,
               private firestore: AngularFirestore,
               private router: Router ) {
                 auth.authState
                   .subscribe( user => {
                     if( user !== null ) {
                      this.getDataUserById( user.uid )
                        .then( user => {
                          this.userData = user.data() as UserData;
                        });
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
  }

  loginWithFacebook() {
    return this.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider() );
  }

  logout() {
    this.router.navigateByUrl('auth');
    this.auth.signOut();
    this.userData = {};
  }

  saveDataNewUser( uid: string, user: UserData ) {
    return this.firestore.collection('users').doc(uid).set(user);
  }

  getDataUserById( id: string ) {
    return this.firestore.collection('users').doc(id).ref.get();
  }

}

