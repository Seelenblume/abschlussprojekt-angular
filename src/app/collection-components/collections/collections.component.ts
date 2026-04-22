import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { CardsApiService } from '../cards/cards-api.service';
import { CardCollection } from '../../../models/card';
import { CollectionGridComponent } from "../../home-page/collection-grid/collection-grid.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-collections',
  imports: [CollectionGridComponent, AsyncPipe],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {

  private route = inject(ActivatedRoute)
  private cardsService = inject(CardsApiService)

  // kein extra subscribe nötig da keine side effects (logging)
  // collections ist ein Observable; mit Async Pipe kann man darauf zugreifen
  collections$ = this.route.queryParamMap.pipe(
    switchMap(params => {
    const query = params.get('query');
    const category = params.get('category');

    if (query){
      return this.cardsService.getCardCollectionBySearch(query);
    } 
    if (category) {
      return this.cardsService.getCardCollectionByCategory(category);
    }
    return of([]);
  })
);  
}
