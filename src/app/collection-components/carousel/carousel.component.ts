import { Component, inject, input, signal } from '@angular/core';
import { CardCollection } from '../../../models/card';
import { CardComponent } from "../card/card.component";
import { LucideChevronLeft, LucideChevronRight, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from "@angular/router";
import { LoginService } from '../../auth/login/login.service';

@Component({
  selector: 'app-carousel',
  imports: [CardComponent, LucideAngularModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  lucideLeft = LucideChevronLeft
  lucideRight = LucideChevronRight

  collection = input.required<CardCollection>()
  loginService = inject(LoginService)
  loginInfo = this.loginService.loginInfo
  currentIndex = signal(0)

  setCurrentIndex(newIndex: number) {
    this.currentIndex.update(() => newIndex)
  }
}
