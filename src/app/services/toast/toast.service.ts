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

  constructor() {
    effect((onCleanup) => {
      const timeouts = this.list().map(toast => 
        setTimeout(() => {
          this.removeToast(toast.id);
        }, 3000)
      )
      onCleanup(() => {
        timeouts.forEach(clearTimeout)
      })
    })
  }

  // https://entwickler.de/angular/angular-effects-anwendungsfalle
  // angular empfiehlt zwar effect sparsam zu benutzen, aber für toast notifications ist es erlaubt


  addToast(notification: ToastNotification) {
    this.list.update((prev) => [
      ...prev,
      notification,
    ])
  }

  removeToast(id: string) {
      this.list.update((prev) => prev.filter((notification) => notification.id !== id))
  }
}
