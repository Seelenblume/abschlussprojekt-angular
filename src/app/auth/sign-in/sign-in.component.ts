import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ToastService } from '../../toast-notifications/toast/toast.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  toast = inject(ToastService)
  loginService = inject(LoginService)
  router = inject(Router)

  authForm = new FormGroup({
    email: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
 
  })

  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.authForm.getRawValue();


    this.loginService.signIn(email, password).subscribe({
      next: (user) => {
        this.router.navigateByUrl(`user/${user.userId}`)
        this.toast.addToast({
            id: uuidv4(),
            message: 'Angemeldet!',
            type: 'SUCCESS'
        })},
      error: (err) => this.toast.addToast({
          id: uuidv4(),
          message: "Anmeldung fehlgeschlagen!",
          type: "ERROR",
      })
    });
     
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
