import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CreateCollectionComponent } from './pages/create-collection/create-collection.component';
import { CardsComponent } from './pages/cards/cards.component';

export const routes: Routes = [
    {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      // Angular resolves routes "first match" -> we have to use children
      // order has to be generic -> spec
      { path: 'collection' , children: [
        {path: 'create', component: CreateCollectionComponent},
        {path: ':collectionId', component: CollectionComponent},
        {path: ':collectionId/cards', component: CardsComponent},
      ] },
    ]
  }
];
