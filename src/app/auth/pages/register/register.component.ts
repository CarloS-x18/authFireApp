import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = this.fb.group({
    name: [ '', [Validators.required, Validators.minLength(6)] ],
    email: [ '', [Validators.required, Validators.email] ],
    password: [ '', [Validators.required, Validators.minLength(6)] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  async register() {
    const { email, password } = this.form.value;

    try {
      await this.authService.register(email, password)
        .then( async(resp) => {
          this.authService.userData = {
            email: resp.user?.email!,
            uid: resp.user?.uid!
          }
          this.router.navigateByUrl('/dashboard');
        });
    } catch (error) {
      console.log(error);
    }

  }

}
