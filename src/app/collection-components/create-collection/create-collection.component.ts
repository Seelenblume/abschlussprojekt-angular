import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-create-collection',
  imports: [ReactiveFormsModule, MatInputModule,MatFormFieldModule, MtxSelectModule],
  templateUrl: './create-collection.component.html',
  styleUrl: './create-collection.component.css'
})
export class CreateCollectionComponent {

  private location = inject(Location)
  private service = inject(CardsApiService)
  private toast = inject(ToastService)
  private router = inject(Router)
  private loginService = inject(LoginService)
  loginData = this.loginService.loginInfo

  categories = testCategories
  
  category: Category[] = []

  form = new FormGroup({
    title: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.maxLength(20)]}),
    desc: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)]}),
  })

  onSubmit() {
    if (this.form.invalid) {
      console.log(this.form.errors);
      this.form.markAllAsTouched();
      return;
    }

    const { desc, title } = this.form.getRawValue()

    const log = this.loginData()
    if (!log) {
      // (idk was sonst hier)
      // fehler toast und dann return?
      return;
    }
    this.service.postCardCollection(log.userId, desc, title, []).subscribe({
      next: (value) => {
        this.toast.addToast({
          id: '',
          message: '',
          type: 'SUCCESS'
        })
        this.router.navigateByUrl(`/collection/${value.collectionId}`)
      },
      error: (error) => {
        this.toast.addToast({
          id: '',
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
