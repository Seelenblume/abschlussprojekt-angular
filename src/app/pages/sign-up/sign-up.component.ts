import { Component, input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
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
