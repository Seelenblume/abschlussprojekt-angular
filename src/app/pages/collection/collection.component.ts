import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CardCollection } from '../../../models/card';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { map, Observable, switchMap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { CardsApiService } from '../../services/cards/cards-api.service';

@Component({
  selector: 'app-collection',
  imports: [RouterLink, CarouselComponent, AsyncPipe],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {
  // collection: CardCollection | null = null
  
  // collection = signal<CardCollection | null>(null)
  // Hier muss ich irgendwie auf route parameter zugreifen

  // collectionId: string | null;

  // collection$: Observable<CardCollection> | undefined;
  private service = inject(CardsApiService)
  private route = inject(ActivatedRoute)

  collection$ = this.route.paramMap.pipe(
  map(params => params.get('collectionId')!),
  switchMap(id => this.service.getCardCollectionById(id))
);
}
