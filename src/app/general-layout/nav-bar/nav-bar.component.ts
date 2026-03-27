import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { LucideSearch, LucideAngularModule, LucidePlus } from 'lucide-angular';
import { LoginService } from '../../auth/login/login.service';
import { ToastService } from '../../toast-notifications/toast/toast.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, SearchBarComponent, LucideAngularModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  plusIcon = LucidePlus;

  loginService = inject(LoginService)
  toast = inject(ToastService)
  router = inject(Router)
  loginInfo = this.loginService.loginInfo

  signOut() {
    this.loginService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl("/")
        this.toast.addToast({
          id: '',
          message: "Signed out!",
          type: 'SUCCESS'
        })
      }, 
      error: () => {
      this.toast.addToast({
          id: '',
          message: "Signed out!",
          type: 'ERROR'
        })
      }
    })
  }
}
