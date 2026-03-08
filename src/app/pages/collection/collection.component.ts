import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, signal } from '@angular/core';
import { CardsApiService } from '../../services/cards-api.service';
import { CardCollection } from '../../../models/card';
import { testCardCollections } from '../../../test/testdata';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-collection',
  imports: [RouterLink, CarouselComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  collection = signal<CardCollection | null>(null)
  // Hier muss ich irgendwie auf route parameter zugreifen

  collectionId: string | null;

  constructor(private service: CardsApiService, route: ActivatedRoute) { 
    this.collectionId = route.snapshot.paramMap.get('collectionId');
  }

  ngOnInit() {
    if (this.collectionId) {
this.service.getCardCollectionById(this.collectionId)
    .subscribe({
      next: (data) => {
        this.collection.set(data)
      },
      error: (err) => {
        console.log(err);
      },
    });
    }
    
    this.collection.set(testCardCollections[1]) 
  }
}
