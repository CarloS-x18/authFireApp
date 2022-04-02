import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = this.fb.group({
    email: [ 'test1@test.com', [Validators.required, Validators.email] ],
    password: [ '123456', [Validators.required, Validators.minLength(6)] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router ) { }

  login() {
    console.log(this.form.valid);
    console.log(this.form.value);

    this.router.navigateByUrl('/dashboard');
  }

}
