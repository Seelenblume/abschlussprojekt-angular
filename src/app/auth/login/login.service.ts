import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { LoginInfo } from '../../../models/loginInfo';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginInfo = signal<LoginInfo | null | false>(null)

  httpClient = inject(HttpClient)

  private apiUrl = environment.apiUrl;
  
  getLogin() {
     return this.httpClient.get<LoginInfo>(`${this.apiUrl}/login`, {withCredentials: true})
      .pipe(
        tap((data) => this.loginInfo.set(data))
      );
  }

  signIn(email: string, password: string) {
    return this.httpClient.post<LoginInfo>(`${this.apiUrl}/login`, { email, password }, {withCredentials: true})
      .pipe(
        tap((data) => this.loginInfo.set(data))
      );
  }

  signUp(name: string, email: string, password: string) {
    return this.httpClient.post<LoginInfo>(`${this.apiUrl}/signup`, {
      email,
      password,
      name
    }, {withCredentials: true}).pipe(
      tap((data) => this.loginInfo.set(data))
    )
  }

  logout() {
    return this.httpClient.delete<void>(`${this.apiUrl}/logout`, {withCredentials: true}).pipe(
      tap(() => this.loginInfo.set(false))
    )
  }
}
