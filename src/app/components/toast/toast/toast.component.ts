import { Component, inject, input } from '@angular/core';
import { NotificationType, ToastService } from '../../../services/toast/toast.service';
import { NgClass } from "../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  id = input.required<string>()
  message = input.required<string>()
  type = input.required<NotificationType>()
  removeToast = input.required<(toastId: string) => void>()
}
