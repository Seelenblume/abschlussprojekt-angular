import { Component, input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private loginService: LoginService) { }

  authForm = new FormGroup({
    userName: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(20)]
    }),
    email: new FormControl<string>("", {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl<string>("", {nonNullable: true, validators: [Validators.required, Validators.maxLength(50)]}),
  })

  onSubmit() {
    if (this.authForm.invalid) {
      console.log(this.authForm.errors);

      this.authForm.markAllAsTouched();
      return;
    }
    console.log(this.authForm.value);

    const { userName, email, password } = this.authForm.getRawValue();

    this.loginService.signUp(userName, email, password)
  }

  get userName() {
    return this.authForm.get("userName")
  }

  get email() {
    return this.authForm.get("email")
  }

  get password() {
    return this.authForm.get("password")
  }
}
