import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = this.fb.group({
    name: [ '', [Validators.required, Validators.minLength(6)] ],
    email: [ '', [Validators.required, Validators.email] ],
    phone: [ '', [Validators.required, Validators.pattern(/^[0-9]{10}$/g), Validators.maxLength(15), Validators.minLength(10) ] ],
    password: [ '', [Validators.required, Validators.minLength(6)] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  async register() {

    if( this.form.invalid ) {
      this.form.markAllAsTouched();
      console.log(this.form.errors)
      return;
    }

    const { email, password, name, phone } = this.form.value;

    try {
      await this.authService.register(email, password)
        .then( async(resp) => {

          this.authService.userData = {
            name,
            email,
            phone
          }

          this.authService.saveDataNewUser( resp.user?.uid!, this.authService.userData );
          this.router.navigateByUrl('/dashboard');
        });
    } catch (error) {
      this.form.reset();
      Swal.fire({
        title: 'Existing Account',
        text: 'This email is already registered, try a different one or sign in.',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }

  }

  formValidator( control: string ) {
    return this.form.controls[`${control}`].invalid
        && this.form.controls[`${control}`].touched;
  }

}
