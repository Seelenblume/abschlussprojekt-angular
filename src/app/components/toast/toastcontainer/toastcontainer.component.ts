import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast/toast.service';
import { ToastComponent } from '../toast/toast.component';

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
