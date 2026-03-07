import { Component, Input, signal } from '@angular/core';
import { testCardCollections } from '../../../test/testdata';
import { CardModalComponent } from '../../components/card-modal/card-modal.component';
import { CardSmallComponent } from '../../components/card-small/card-small.component';
import { CardModel } from '../../../models/card';

@Component({
  selector: 'app-cards',
  imports: [CardModalComponent, CardSmallComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  // Hier muss ich irgendwie auf route parameter zugreifen

  showModal = signal(false)
  selectedCard = signal<CardModel | null>(null)

  collection = testCardCollections[1]


  handleUpdateCard(id: string, front?: string, back?: string, notes?: string) {
    console.log("updateCard", id);
    
  }

  setShowModal(show: boolean) {
    this.showModal.update(() => show)
  }

  setSelectedCard(card: CardModel) {
    this.selectedCard.update(() => card)
  }

  onEdit(show: boolean, card: CardModel) {
    this.setShowModal(show)
    this.setSelectedCard(card)
  }
}
