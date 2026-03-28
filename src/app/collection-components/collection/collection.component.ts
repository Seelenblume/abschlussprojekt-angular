import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CardCollection } from '../../../models/card';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, switchMap } from 'rxjs';
import { CardsApiService } from '../cards/cards-api.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { LoginService } from '../../auth/login/login.service';
import { LucideAngularModule, LucideBookmark, LucideLibraryBig } from 'lucide-angular';
import { ToastService } from '../../toast-notifications/toast/toast.service';
import { CategoryTagComponent } from "../category-components/category-tag/category-tag.component";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-collection',
  imports: [RouterLink, CarouselComponent, LucideAngularModule, CategoryTagComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {
  // collection: CardCollection | null = null

  // Hier muss ich irgendwie auf route parameter zugreifen

  // collectionId: string | null;

  lucideBookmark = LucideBookmark
  lucideLibraryBig = LucideLibraryBig
  bookmark = signal(false)
  // collection$: Observable<CardCollection> | undefined;
  private service = inject(CardsApiService)
  private route = inject(ActivatedRoute)
  private loginService = inject(LoginService)
  private toast = inject(ToastService)
  loginInfo = this.loginService.loginInfo

  // wandelt observable in ein signal um
  collection = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('collectionId')!),
      switchMap(id => this.service.getCardCollectionById(id))
    ),
    { initialValue: null }
  );

  handleBookmark() {
  const loginData = this.loginInfo();
  const col = this.collection();

  if (!col || !loginData) {
    return
  };

  const apiObservable$ = this.bookmark()
    ? this.service.deleteBookmark(loginData.userId, col.collectionId)
    : this.service.postBookmark(loginData.userId, col.collectionId);

  apiObservable$.subscribe({
    next: () => {
      this.toast.addToast({
        id: '',
        message: this.bookmark()
          ? 'Bookmark entfernt'
          : 'Bookmark hinzugefügt',
        type: 'SUCCESS'
      });

      this.bookmark.update(value => !value);
    },
    error: () => {
      this.toast.addToast({
        id: '',
        message: 'Fehler beim Bookmark',
        type: 'ERROR'
      });
    }
  });
}
}
