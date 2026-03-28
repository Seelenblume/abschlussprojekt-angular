import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LucideX, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-card-modal-update',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './card-modal-update.component.html',
  styleUrl: './card-modal-update.component.css'
})
export class CardModalUpdateComponent {

  form = new FormGroup({
    front: new FormControl(""),
    back:  new FormControl(""),
    notes: new FormControl(""),
  })

  lucideX = LucideX

  closeModal = output<boolean>()
  addCard = output<CardForm>()

  onCloseModal() {
    this.closeModal.emit(false)
  }

  onSubmit(event: Event) {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    console.log("submit");
    this.addCard.emit(this.form.getRawValue())
  }

    get front() {
    return this.form.get("front")
  }

  get back() {
    return this.form.get("back")
  }

  get notes() {
    return this.form.get("notes")
  }
}

type CardForm = {
  front: string | null
  back: string | null
  notes: string | null
}
