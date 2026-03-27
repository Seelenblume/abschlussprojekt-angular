import { Component } from '@angular/core';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { ToastcontainerComponent } from "../components/toast/toastcontainer/toastcontainer.component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavBarComponent, ToastcontainerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
