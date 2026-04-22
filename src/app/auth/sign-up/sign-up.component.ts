import { Component, inject, input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { LoginService } from '../login/login.service';
import { ToastService } from '../../toast-notifications/toast/toast.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  loginService = inject(LoginService)
  toast = inject(ToastService)
  router = inject(Router)

  authForm = new FormGroup({
    userName: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(20)]
    }),
    email: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
  })

  onSubmit() {
    if (this.authForm.invalid) {
      console.log(this.authForm.errors);

      this.authForm.markAllAsTouched();
      return;
    }
    console.log(this.authForm.value);

    const { userName, email, password } = this.authForm.getRawValue();

    this.loginService.signUp(userName, email, password).subscribe({
      next: (user) => {
        this.router.navigateByUrl(`/user/${user.userId}`)
        this.toast.addToast({
            id: uuidv4(),
            message: 'Angemeldet!',
            type: 'SUCCESS'
        })},
      error: (err) => this.toast.addToast({
          id: uuidv4(),
          message: "Registrierung fehlgeschlagen!",
          type: "ERROR",
      })
    });
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
