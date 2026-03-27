import { Component, inject } from '@angular/core';
import { CollectionGridComponent } from '../../components/collection-grid/collection-grid.component';
import { CardsApiService } from '../../services/cards/cards-api.service';
import { AsyncPipe } from '@angular/common';

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
