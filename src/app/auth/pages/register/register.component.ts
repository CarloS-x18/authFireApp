import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = this.fb.group({
    name: [ 'Test 1', [Validators.required, Validators.minLength(6)] ],
    email: [ 'test1@test.com', [Validators.required, Validators.email] ],
    password: [ '123456', [Validators.required, Validators.minLength(6)] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router ) { }

  register() {
    console.log(this.form.valid);
    console.log(this.form.value);

    this.router.navigateByUrl('/dashboard');
  }

}
