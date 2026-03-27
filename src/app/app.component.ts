import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  loginService = inject(LoginService)
  toast = inject(ToastService)

  ngOnInit(): void {
    this.loginService.getLogin().subscribe({
      next: (user) => {
        console.log(user)
      },
      error: () => {
        this.toast.addToast({
          id: "136",
          message: "Something",
          type: "ERROR",
        })
      }
    })
  }

  title = 'app';
}
