import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-banner',
  imports: [],
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.css'
})
export class ProfileBannerComponent {
  username = input.required()
}
