import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CardsApiService } from '../../services/cards-api.service';
import { CardCollection } from '../../../models/card';
import { testCardCollections } from '../../../test/testdata';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { map, Observable, switchMap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-collection',
  imports: [RouterLink, CarouselComponent, NgIf, AsyncPipe],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit{
  // collection: CardCollection | null = null
  
  // collection = signal<CardCollection | null>(null)
  // Hier muss ich irgendwie auf route parameter zugreifen

  collectionId: string | null;

  collection$: Observable<CardCollection> | undefined;

  constructor(private service: CardsApiService, private route: ActivatedRoute) {
    // mit snapshot auf param zugreifen bei constructor aufruf
    this.collectionId = route.snapshot.paramMap.get('collectionId');

    
  }

  ngOnInit() {

    this.collection$ = this.service.getCardCollectionById(this.collectionId!);
    // if (this.collectionId) {
    //   this.service.getCardCollectionById(this.collectionId)
    //     .subscribe({
    //       next: (data) => {
    //         this.collection = data
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       },
    //       complete: () => {
    //         console.log("complete");
            
    //       }
    //     });

    // }

    // this.collection = testCardCollections[1]
  }
}
