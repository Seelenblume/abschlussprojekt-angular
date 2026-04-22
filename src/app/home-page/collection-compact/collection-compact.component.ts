import { Component, input } from '@angular/core';
import { CardCollection } from '../../../models/card';
import { LucideAngularModule, LucideLibrary } from 'lucide-angular';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-collection-compact',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './collection-compact.component.html',
  styleUrl: './collection-compact.component.css'
})
export class CollectionCompactComponent {
  collection = input.required<CardCollection>()

  LucideLibrary = LucideLibrary;
}
