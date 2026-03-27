import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CardsApiService } from '../cards/cards-api.service';
import { CardCollection } from '../../../models/card';

@Component({
  selector: 'app-collections',
  imports: [],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {

  private route = inject(ActivatedRoute)
  private service = inject(CardsApiService)

  collections: CardCollection[] | null = null

      query$ = this.route.queryParamMap.pipe(
        map((params) => params.get("query")!), 
        switchMap(query => this.service.getCardCollectionBySearch(query)))

        // ????????
    
}
