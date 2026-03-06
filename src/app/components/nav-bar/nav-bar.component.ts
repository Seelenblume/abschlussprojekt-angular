import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { LucideSearch, LucideAngularModule, LucidePlus } from 'lucide-angular';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, SearchBarComponent, LucideAngularModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  plusIcon = LucidePlus;
}
