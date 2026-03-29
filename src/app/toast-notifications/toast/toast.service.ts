import { effect, Injectable, OnChanges, signal, SimpleChanges } from '@angular/core';

export type NotificationType = "SUCCESS" | "ERROR"

export interface ToastNotification {
  id: string;
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  list = signal<ToastNotification[]>([])

  addToast(notification: ToastNotification) {
    this.list.update((prev) => [
      ...prev,
      notification,
    ])
    setTimeout(() => {
    this.removeToast(notification.id);
  }, 3000);
  }

  removeToast(id: string) {
      this.list.update((prev) => prev.filter((notification) => notification.id !== id))
  }
}
