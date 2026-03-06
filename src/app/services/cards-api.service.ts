import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { testCardCollections } from '../../test/testdata';
import { CardCollection } from '../../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardsApiService {

  constructor(private http: HttpClient) { }

  getCardCollectionById(collectionId: string) {
    return this.http.get<CardCollection>(`${collectionId}`)
  }
}
