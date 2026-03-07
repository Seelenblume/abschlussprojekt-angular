import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { testCategories } from '../../../test/testdata';
import { Category } from '../../../models/category';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-create-collection',
  imports: [ReactiveFormsModule, MatInputModule,MatFormFieldModule, MtxSelectModule],
  templateUrl: './create-collection.component.html',
  styleUrl: './create-collection.component.css'
})
export class CreateCollectionComponent {

  constructor(private location: Location) { }

  categories = testCategories
  
  category: Category[] = []

  form = new FormGroup({
    title: new FormControl<string>("", [Validators.required, Validators.maxLength(20)]),
    desc: new FormControl<string>("", [Validators.maxLength(200)]),
  })

  onSubmit() {
    if (this.form.invalid) {
      console.log(this.form.errors);

      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }

  onBack() {
    this.location.back()
  }

  get title() {
    return this.form.get("title")
  }

  get desc() {
    return this.form.get("desc")
  }
}
