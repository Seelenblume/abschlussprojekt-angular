import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, LucideX } from 'lucide-angular';

@Component({
  selector: 'app-card-modal',
  imports: [LucideAngularModule],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css'
})
export class CardModalComponent {

  form = new FormGroup({
    front: new FormControl<string>("", { nonNullable: true, validators: [Validators.required]}),
    back: new FormControl<string>("", { nonNullable: true, validators: [Validators.required]}),
    notes: new FormControl<string>("", { nonNullable: true, validators: [Validators.required]}),
  })

  lucideX = LucideX

  closeModal = output<boolean>()
  addCard = output<CardForm>()

  onCloseModal() {
    this.closeModal.emit(false)
  }

  onSubmit() {
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
  front: string
  back: string
  notes: string
}