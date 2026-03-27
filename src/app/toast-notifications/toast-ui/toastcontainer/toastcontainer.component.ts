import { Component, inject } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-toastcontainer',
  imports: [ToastComponent],
  templateUrl: './toastcontainer.component.html',
  styleUrl: './toastcontainer.component.css'
})
export class ToastcontainerComponent {
  toastService = inject(ToastService)

  list = this.toastService.list

  removeToast(toastId: string) {
    return this.toastService.removeToast(toastId)
  } 
}
