import { Component, inject, OnInit, signal } from '@angular/core';
import { CardModalComponent } from '../../components/card-modal/card-modal.component';
import { CardSmallComponent } from '../../components/card-small/card-small.component';
import { CardCollection, CardModel } from '../../../models/card';
import { ActivatedRoute } from '@angular/router';
import { CardsApiService } from '../../services/cards/cards-api.service';
import { map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';
import { CardModalUpdateComponent } from "../../components/card-modal-update/card-modal-update.component";

@Component({
  selector: 'app-cards',
  imports: [CardModalComponent, CardSmallComponent, CardModalUpdateComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
  // Hier muss ich irgendwie auf route parameter zugreifen
  // collectionId: string | null;
  route = inject(ActivatedRoute)
  service = inject(CardsApiService)
  toast = inject(ToastService)

  collection = signal<CardCollection | null>(null);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('collectionId')!),
      switchMap(id => this.service.getCardCollectionById(id))).subscribe(col => this.collection.set(col));
  }
  // aus den route params wird die collectionId gezogen,
  // collection angefragt und zu einem Signal konvertiert mit initialvalue null
  // collection = toSignal(this.route.paramMap.pipe(
  //   map(params => params.get('collectionId')!),
  //   switchMap(id => this.service.getCardCollectionById(id))));
  // switchMap(id => this.service.getCardCollectionById(id))), { initialValue: null });

  showModal = signal(false)
  selectedCard = signal<CardModel | null>(null)

  handleAddCard(front: string, back: string, notes: string) {

    const col = this.collection();
    if (!col) {
      throw new Error('Keine Collection');
    }

    this.service.postCard(col.collectionId, front, back, notes).pipe(
      switchMap(() => this.service.getCardCollectionById(col.collectionId))
    ).subscribe({
      next: (updated) => {
        this.collection.set(updated);
      },
      error: (err) => {
        this.toast.addToast({
          id: "qwetrz",
          message: err,
          type: "ERROR",
        });
      }
    });


  }

  async handleUpdateCard(id: string, front: string | null, back: string | null, notes: string | null) {
    
    const col = this.collection();
    if (!col) {
      throw new Error('Keine Collection');
    }

    const f = front ?? undefined
    const b = back ?? undefined
    const n = notes ?? undefined

    this.service.updateCard(id, f, b, n).pipe(
      switchMap(() => this.service.getCardCollectionById(col.collectionId))
    ).subscribe({
      next: (updated) => {
        this.collection.set(updated);
      },
      error: (err) => {
        this.toast.addToast({
          id: "qwetrz",
          message: err,
          type: "ERROR",
        });
      }
    });


  }

  setShowModal(show: boolean) {
    this.showModal.set(show)
  }

  setSelectedCard(card: CardModel) {
    this.selectedCard.set(card)
  }

  onEdit(card: CardModel) {
    this.selectedCard.set(card);
    this.showModal.set(true);
}
}
