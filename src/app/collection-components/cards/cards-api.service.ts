import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CardCollection } from '../../../models/card';
import { environment } from '../../../environments/environment.development';
import { Category } from '../../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CardsApiService {
  private apiUrl = environment.apiUrl;

  httpClient = inject(HttpClient)

  getPopularCollections() {
    return this.httpClient.get<CardCollection[]>(`${this.apiUrl}/collections/popular`)
  }

  getCardCollectionById(collectionId: string) {
    return this.httpClient.get<CardCollection>(`${this.apiUrl}/collection/${collectionId}`)
  }

  getCardCollectionByCategory(category: string) {
    return this.httpClient.get<CardCollection[]>(`${this.apiUrl}/collection_by_category/${category}`)
  }

  getCardCollectionBySearch(search: string) {
    return this.httpClient.get<CardCollection[]>(`${this.apiUrl}/search?query=${search}`)
  }

  getSavedCollectionsByUserId(userId: string) {
    return this.httpClient.get<CardCollection[]>(`${this.apiUrl}/saved/${userId}`)
  }

  postCardCollection(
    userId: string,
    title: string,
    categories: Category[],
    color: string,
    description?: string,
  ) {
    return this.httpClient.post<CardCollection>(`${this.apiUrl}/collection`,
      JSON.stringify({
        userId, title, description, color, categories,
      }),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      }
    )
  }

  postCard(
    collectionId: string,
    front: string,
    back: string,
    notes: string,
  ) {
    const array = [{
      front,
      back,
      notes
    }]
    return this.httpClient.post(`${this.apiUrl}/card`,
      JSON.stringify({
        collectionId,
        cards: array
      }),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      }
    )
  }

  updateCard(
    cardId: string,
    changes: {
      front?: string,
      back?: string,
      notes?: string,
    }
  ) {
    return this.httpClient.put(`${this.apiUrl}/card`,
      JSON.stringify({ cardId, ...changes }),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      }
    )
  }

  postBookmark(
    userId: string, collectionId: string
  ) {
    return this.httpClient.post(`${this.apiUrl}/save`,
      JSON.stringify({
        userId,
        collectionId,
      }),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      }
    )
  }

  deleteBookmark(
    userId: string, collectionId: string
  ) {
    return this.httpClient.delete(`${this.apiUrl}/save`,
      {
        body: JSON.stringify({
          userId,
          collectionId,
        }),
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true
      }
    )
  }





}
