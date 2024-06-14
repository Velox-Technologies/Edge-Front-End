import { Injectable } from '@angular/core';
import { ToastComponent } from '../../../components/common/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastComponent: ToastComponent | null = null;

  setToastComponent(toastComponent: ToastComponent): void {
    this.toastComponent = toastComponent;
  }

  showToast(
    message: string,
    duration: number = 3000,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
  ): void {
    if (this.toastComponent) {
      this.toastComponent.showToast(message, duration, type);
    } else {
      console.error('ToastComponent is not set.');
    }
  }
}
