import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../auth/login/login.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoggedInUserProfileComponent } from "./logged-in-user-profile/logged-in-user-profile.component";
import { ProfileBannerComponent } from "./profile-banner/profile-banner.component";
import { CollectionGridComponent } from '../home-page/collection-grid/collection-grid.component';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe, LoggedInUserProfileComponent, ProfileBannerComponent, CollectionGridComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  loginService = inject(LoginService)
  loginInfo = this.loginService.loginInfo
  route = inject(ActivatedRoute)
  userService = inject(UserService)

  user$ = this.route.paramMap.pipe(
  map(params => params.get('userId')!),
  switchMap(id => this.userService.getUserById(id)))
  
}
