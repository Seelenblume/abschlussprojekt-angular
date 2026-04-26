import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../../models/category';
import { CategoryService } from '../category/category.service';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [MatMenuModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

  categories: Category[] = []
  
  private categoryService = inject(CategoryService)
  private router = inject(Router)

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (value) => {
        this.categories = value
      }
    })
  }

  onClick(category: Category) {
      const url = `collections?category=${category.value}`
      this.router.navigateByUrl(url);
  }
}
