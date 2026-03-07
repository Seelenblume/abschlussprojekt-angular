import { Component, input } from '@angular/core';
import { CardModel } from '../../../models/card';

@Component({
  selector: 'app-card-small',
  imports: [],
  templateUrl: './card-small.component.html',
  styleUrl: './card-small.component.css'
})
export class CardSmallComponent {
  card = input.required<CardModel>()
}
