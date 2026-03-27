import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ToastService } from '../../toast-notifications/toast/toast.service';

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
      console.log(this.authForm.errors);
       this.toast.addToast({
        id: "1352637",
        message: "Something went werong when submit",
        type: "ERROR"
      })
      
      this.authForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.authForm.getRawValue();


    this.loginService.signIn(email, password).subscribe({
      next: (user) => {
        this.router.navigateByUrl(`user/${user.userId}`)
        this.toast.addToast({
        id: '',
        message: 'Signed In!',
        type: 'SUCCESS'
      })},
      error: (err) => this.toast.addToast({
        id: '',
        message: (err as Error).message,
        type: 'ERROR'
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
