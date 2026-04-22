import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CardCollection, CardModel } from '../../../../models/card';
import { ToastService } from '../../../toast-notifications/toast/toast.service';
import { CardsApiService } from '../../cards/cards-api.service';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { CardSmallComponent } from '../card-small/card-small.component';
import { LucidePlus, LucideAngularModule, LucideSquarePen } from 'lucide-angular';
import { CardUpdateModalComponent } from "../card-update-modal/card-update-modal.component";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cards',
  imports: [CardModalComponent, CardSmallComponent, LucideAngularModule, CardUpdateModalComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {

  lucidePlus = LucidePlus
  lucideEdit = LucideSquarePen

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
    // console.log(card)
    const col = this.collection();
    if (!col) {
      this.toast.addToast({
        id: uuidv4(),
        message: "Hinzufügen fehlgeschlagen!",
        type: "ERROR",
      })
      return
    }

    this.service.postCard(col.collectionId, front, front, notes).pipe(
      switchMap(() => this.service.getCardCollectionById(col.collectionId))
    ).subscribe({
      next: (updated) => {
        this.collection.set(updated);
        this.showModal.set(false)
      },
      error: (err) => {
        this.toast.addToast({
          id: uuidv4(),
          message: "Hinzufügen fehlgeschlagen!",
          type: "ERROR",
        })
      }
    });


  }

  async handleUpdateCard(id: string, front?: string, back?: string, notes?: string) {
    console.log(front, back, notes)
    const col = this.collection();
    if (!col) {
      this.toast.addToast({
        id: uuidv4(),
        message: "Aktualisieren fehlgeschlagen!",
        type: "ERROR",
      })
      return
    }

    this.service.updateCard(id, { front, back, notes }).pipe(
      switchMap(() => this.service.getCardCollectionById(col.collectionId))
    ).subscribe({
      next: (updated) => {
        this.collection.set(updated);
        this.showModal.set(false)

      },
      error: (err) => {
        this.toast.addToast({
          id: uuidv4(),
          message: "Aktualisieren fehlgeschlagen!",
          type: "ERROR",
        })
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


type CardForm = {
  front: string
  back: string
  notes: string
}
