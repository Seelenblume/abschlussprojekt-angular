import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideSearch, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-search-bar',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchIcon = LucideSearch;

  query: string = ""

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(event.target);
    
    console.log(this.query)
  }
}
