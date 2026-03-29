import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { testCategories } from '../../../test/testdata';
import { Category } from '../../../models/category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../auth/login/login.service';
import { ToastService } from '../../toast-notifications/toast/toast.service';
import { CardsApiService } from '../cards/cards-api.service';
import { Router} from '@angular/router';
import { CategoryService } from '../category-components/category/category.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-collection',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MtxSelectModule],
  templateUrl: './create-collection.component.html',
  styleUrl: './create-collection.component.css'
})
export class CreateCollectionComponent implements OnInit{

  private location = inject(Location)
  private service = inject(CardsApiService)
  private toast = inject(ToastService)
  private router = inject(Router)
  private categoryService = inject(CategoryService)
  private loginService = inject(LoginService)
  loginData = this.loginService.loginInfo

  categories: Category[] = []

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (value) => {
        this.categories = value
      }
    })
  }
  

  form = new FormGroup({
    title: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.maxLength(20)]}),
    desc: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)]}),
    categories: new FormControl<Category[]>([], { nonNullable: true, })
  })

  onSubmit() {
    if (this.form.invalid) {
      console.log(this.form.errors);
      this.form.markAllAsTouched();
      return;
    }

    const { desc, title, categories } = this.form.getRawValue()

    const log = this.loginData()
    if (!log) {
      // (idk was sonst hier)
      // fehler toast und dann return?
      return;
    }
    this.service.postCardCollection(log.userId, title, categories, "blue", desc).subscribe({
      next: (value) => {
        this.toast.addToast({
          id: uuidv4(),
          message: '',
          type: 'SUCCESS'
        })
        this.router.navigateByUrl(`/collection/${value.collectionId}`)
      },
      error: (error) => {
        this.toast.addToast({
          id: uuidv4(),
          message: (error as Error).message,
          type: 'ERROR'
        })
      }
    })
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
