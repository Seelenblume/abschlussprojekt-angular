import { Component } from '@angular/core';
import { CollectionGridComponent } from '../../components/collection-grid/collection-grid.component';
import { testCardCollections } from '../../../test/testdata';

@Component({
  selector: 'app-home',
  imports: [CollectionGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  testCardCollection = testCardCollections
}
