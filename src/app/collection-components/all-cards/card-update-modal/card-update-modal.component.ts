import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, LucideX } from 'lucide-angular';

type CardForm = {
  front?: string;
  back?: string;
  notes?: string;
};

@Component({
  selector: 'app-card-update-modal',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './card-update-modal.component.html',
  styleUrl: './card-update-modal.component.css'
})
export class CardUpdateModalComponent {
  closeModal = output<boolean>();
  updateCard = output<CardForm>();

  form = new FormGroup({
    front: new FormControl("", {nonNullable: true}),
    back: new FormControl("", {nonNullable: true}),
    notes: new FormControl("", {nonNullable: true}),
  });

  lucideX = LucideX

  onCloseModal() {
    this.closeModal.emit(false)
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    this.updateCard.emit(raw);
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