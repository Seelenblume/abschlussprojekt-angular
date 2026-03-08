import { Component, inject, Input, signal } from '@angular/core';
import { testCardCollections } from '../../../test/testdata';
import { CardModalComponent } from '../../components/card-modal/card-modal.component';
import { CardSmallComponent } from '../../components/card-small/card-small.component';
import { CardModel } from '../../../models/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards',
  imports: [CardModalComponent, CardSmallComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  // Hier muss ich irgendwie auf route parameter zugreifen
  collectionId: string | null;

  constructor(route: ActivatedRoute) {
     this.collectionId = route.snapshot.paramMap.get('collectionId');
  }

  showModal = signal(false)
  selectedCard = signal<CardModel | null>(null)

  collection = testCardCollections[1]


  handleUpdateCard(id: string, front: string | null, back: string | null, notes: string | null) {

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
