import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../../models/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  httpClient = inject(HttpClient)

  getUserById(userId: string) {
    return this.httpClient.get<User>(`${this.apiUrl}/user/${userId}`)
  }
}
