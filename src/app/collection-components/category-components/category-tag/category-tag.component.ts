import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Category } from '../../../../models/category';

@Component({
  selector: 'app-category-tag',
  imports: [RouterLink],
  templateUrl: './category-tag.component.html',
  styleUrl: './category-tag.component.css'
})
export class CategoryTagComponent {
  category = input.required<Category>()
}
