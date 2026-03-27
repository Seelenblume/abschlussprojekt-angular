import { Component, input, signal } from '@angular/core';
import { CardModel } from '../../../models/card';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  card = input.required<CardModel>()
  showBack = signal(false)

  flip() {
    this.showBack.update((show) => !show)
    
  }
}
