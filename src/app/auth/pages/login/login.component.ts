import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { UserData } from '../../interface/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = this.fb.group({
    email: [ '', [Validators.required, Validators.email] ],
    password: [ '', [Validators.required, Validators.minLength(6)] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) {}

  async login() {

    if( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    try {
      await this.authService.login(email, password)
        .then( resp => {
          this.authService.getDataUserById( resp.user?.uid! )
          .then( user => {
            this.authService.userData = user.data() as UserData;
          });
          this.router.navigateByUrl('/dashboard');
        });
    } catch (error) {
      this.form.reset();
      this.showAlert();
    }
  }

  showAlert() {
    Swal.fire({
      title: 'Error',
      text: 'Wrong email or password, please try again.',
      icon: 'error',
      confirmButtonText: 'Retry'
    });
  }

  loginWithGoogle() {
    return this.authService.loginWithGoogle()
      .then( resp => {
        this.authService.userData = {
          name: resp.user?.displayName!,
          email: resp.user?.email!,
          phone: resp.user?.phoneNumber!,
          url_Photo: resp.user?.photoURL!
        }

        this.authService.saveDataNewUser( resp.user?.uid!, this.authService.userData );

        this.router.navigateByUrl('/dashboard');
      })
      .catch( err => {
        console.log(err.message);
      });
  }

  loginWithFacebook() {
    return this.authService.loginWithFacebook()
      .then( resp =>{
        this.authService.userData = {
          name: resp.user?.displayName!,
          email: resp.user?.email!,
          phone: resp.user?.phoneNumber!,
          url_Photo: resp.user?.photoURL!
        }

        this.authService.saveDataNewUser( resp.user?.uid!, this.authService.userData );

        this.router.navigateByUrl('/dashboard');
      })
      .catch( err => {
        console.log(err.message);
      });
  }
}
