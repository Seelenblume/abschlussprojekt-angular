import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './auth/login/login.service';
import { ToastService } from './toast-notifications/toast/toast.service';

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
      },
      error: () => {
      }
    })
  }
}
