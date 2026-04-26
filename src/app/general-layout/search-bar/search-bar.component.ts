import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideSearch, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-search-bar',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchIcon = LucideSearch;
  router = inject(Router)

  query = ""

  onSubmit() {
    if (this.query) {
      this.router.navigateByUrl(`/collections?query=${this.query}`)
    }
  }
}
