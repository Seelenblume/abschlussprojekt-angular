import { Routes } from '@angular/router';
import { LayoutComponent } from './general-layout/layout/layout.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CardsComponent } from './collection-components/all-cards/cards/cards.component';
import { CollectionComponent } from './collection-components/collection/collection.component';
import { CreateCollectionComponent } from './collection-components/create-collection/create-collection.component';
import { HomeComponent } from './home-page/home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


export const routes: Routes = [
    {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'user/:userId', component: UserProfileComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'collection' , children: [
        {path: 'create', component: CreateCollectionComponent},
        {path: ':collectionId', component: CollectionComponent},
        {path: ':collectionId/cards', component: CardsComponent},
      ] },
    ]
  }
];


      // Angular resolves routes "first match" -> we have to use children
      // order has to be generic -> specific