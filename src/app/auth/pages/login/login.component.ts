import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
               private authService: AuthService ) { }

  async login() {

    const { email, password } = this.form.value;

    try {
      await this.authService.login(email, password)
        .then( resp => {
          this.router.navigateByUrl('/dashboard');
        })
    } catch (error) {
      console.log(error)
    }

  }

  loginWithGoogle() {
    return this.authService.loginWithGoogle()
      .then( resp => {
        this.router.navigateByUrl('/dashboard');
      })
      .catch( err => {
        console.log(err.message);
      });
  }
}
