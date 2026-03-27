import { Component, input } from '@angular/core';
import { CollectionCompactComponent } from '../collection-compact/collection-compact.component';
import { CardCollection } from '../../../models/card';

@Component({
  selector: 'app-collection-grid',
  imports: [CollectionCompactComponent],
  templateUrl: './collection-grid.component.html',
  styleUrl: './collection-grid.component.css'
})
export class CollectionGridComponent {
  collections = input.required<CardCollection[]>()
}
