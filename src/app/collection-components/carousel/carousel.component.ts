import { Component, input, signal } from '@angular/core';
import { CardCollection } from '../../../models/card';
import { CardComponent } from "../card/card.component";
import { LucideChevronLeft, LucideChevronRight, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from "@angular/router";

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
  currentIndex = signal(0)

  setCurrentIndex(newIndex: number) {
    this.currentIndex.update(() => newIndex)
  }
}
