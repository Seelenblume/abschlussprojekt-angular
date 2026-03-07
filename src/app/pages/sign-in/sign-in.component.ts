import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  authForm = new FormGroup({
    email: new FormControl<string>("", [Validators.required, Validators.email]),
    password: new FormControl<string>("", [Validators.required, Validators.maxLength(50)]),
  })

  onSubmit() {
    if (this.authForm.invalid) {
      console.log(this.authForm.errors);
      
      this.authForm.markAllAsTouched();
      return;
    }
    console.log(this.authForm.value);

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
