import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  type = input.required<"sign-in" | "sign-up">()

  authForm = new FormGroup({
    userName: new FormControl<string>("", [Validators.required, Validators.maxLength(20)]),
    email: new FormControl<string>("", [Validators.required, Validators.email]),
    password: new FormControl<string>("", [Validators.required, Validators.maxLength(50)]),
  })

  onSubmit() {
    if (this.authForm.invalid) {
      console.log(this.authForm.errors);
      
      this.authForm.markAllAsTouched();
      return;
    }
    if (this.type() === "sign-in") {
            console.log("sign-in", this.authForm.value)

        } else {
            console.log("sign-up", this.authForm.value)

        }

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