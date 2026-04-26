import { Component, inject, input } from '@angular/core';
import { NgClass } from "../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";
import { NotificationType } from '../../toast/toast.service';
import { LucideAngularModule, LucideX } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  imports: [LucideAngularModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  id = input.required<string>()
  message = input.required<string>()
  type = input.required<NotificationType>()
  removeToast = input.required<(toastId: string) => void>()
  lucideX = LucideX
}
