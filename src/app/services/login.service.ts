import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginInfo } from '../../models/loginInfo';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginInfo = signal<LoginInfo | null>(null)

  constructor(private httpClient: HttpClient) { }

  private url = ""

  // idk ob man hier subscriben soll oder nicht...
  signIn(email: string, password: string) {
    this.httpClient.post<LoginInfo>(this.url, {
      email,
      password
    }).subscribe({
      next: (data) => {
        this.loginInfo.set(data)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  signUp(userName: string, email: string, password: string) {
    return this.httpClient.post<LoginInfo>(this.url, {
      userName,
      email,
      password
    }).subscribe({
      next: (data) => {
        this.loginInfo.set(data)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout() {
    return this.httpClient.delete(this.url)
  }
}
