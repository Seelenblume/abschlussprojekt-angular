import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, LucideX } from 'lucide-angular';

@Component({
  selector: 'app-card-modal',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {
  closeModal = output<boolean>();
  addCard = output<CardForm>();

  form = new FormGroup({
    front: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    back: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    notes: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
  })

  lucideX = LucideX

  onCloseModal() {
    this.closeModal.emit(false)
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.addCard.emit(this.form.getRawValue());
  }
}

type CardForm = {
  front: string;
  back: string;
  notes: string;
}