import { Component, inject, input, OnInit } from '@angular/core';
import { CardCollection } from '../../../models/card';
import { User } from '../../../models/user';
import { CardsApiService } from '../../collection-components/cards/cards-api.service';
import { CollectionGridComponent } from '../../home-page/collection-grid/collection-grid.component';
import { ToastService } from '../../toast-notifications/toast/toast.service';
import { ProfileBannerComponent } from '../profile-banner/profile-banner.component';

@Component({
  selector: 'app-logged-in-user-profile',
  imports: [ProfileBannerComponent, CollectionGridComponent],
  templateUrl: './logged-in-user-profile.component.html',
  styleUrl: './logged-in-user-profile.component.css'
})
export class LoggedInUserProfileComponent implements OnInit{
  user = input.required<User>()
  service = inject(CardsApiService)
  toast = inject(ToastService)
  savedCollections: CardCollection[] | null = null

  showSaved = false

  ngOnInit(): void {
    this.service.getSavedCollectionsByUserId(this.user().userId).subscribe({
      next: (value) => {
        this.savedCollections = value
      },
      error: (error) => {
        this.toast.addToast({
          id: '',
          message: (error as Error).message,
          type: 'SUCCESS'
        })
      }
    })
  }

  toggleShowSaved(value: boolean) {
    this.showSaved  = value
  }
}
