import { inject, Injectable } from '@angular/core';
import { Category } from '../../../models/category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl;

  httpClient = inject(HttpClient)

  getAllCategories() {
    return this.httpClient.get<Category[]>(`${this.apiUrl}`)
  }
}
