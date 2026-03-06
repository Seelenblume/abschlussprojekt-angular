import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CardsApiService } from '../../services/cards-api.service';
import { CardCollection } from '../../../models/card';
import { testCardCollections } from '../../../test/testdata';
import { RouterLink } from "@angular/router";
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-collection',
  imports: [RouterLink, CarouselComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  collection: CardCollection | null = null;
  @Input() collectionId!: string

  constructor(private service: CardsApiService) { }

  ngOnInit() {
    // this.service.getCardCollectionById(this.collectionId).subscribe(
    //   (data) => {
    //     this.collection = data
    //   },
    //   (error) => {
    //     console.log("Error");
    //   }
    // )
    this.collection = testCardCollections[1]
  }
}
