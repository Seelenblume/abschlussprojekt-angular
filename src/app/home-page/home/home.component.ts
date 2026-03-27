import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CollectionGridComponent } from '../collection-grid/collection-grid.component';
import { CardsApiService } from '../../collection-components/cards/cards-api.service';

@Component({
  selector: 'app-home',
  imports: [CollectionGridComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cardService = inject(CardsApiService)

  collections = this.cardService.getPopularCollections()
}
