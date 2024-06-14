import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'Toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('toastAnimation', [
      state(
        'show',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      state(
        'hide',
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        })
      ),
      transition('hide => show', [animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')]),
      transition('show => hide', [animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')]),
    ]),
  ],
})
export class ToastComponent implements OnInit, OnChanges {
  @Input() show = false;
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';

  iconName: string = '';
  borderClass: string = '';

  constructor() {}

  ngOnInit(): void {
    this.setIconAndBorder();
  }

  ngOnChanges(): void {
    this.setIconAndBorder();
  }

  private setIconAndBorder(): void {
    switch (this.type) {
      case 'success':
        this.iconName = 'CircleCheck';
        this.borderClass = 'border border-green-700';
        break;
      case 'error':
        this.iconName = 'CircleX';
        this.borderClass = 'border border-red-700';
        break;
      case 'info':
        this.iconName = 'Info';
        this.borderClass = 'border border-gray-600';
        break;
      case 'warning':
        this.iconName = 'OctagonAlert';
        this.borderClass = 'border border-yellow-700';
        break;
      default:
        this.iconName = 'Info';
        this.borderClass = 'border border-gray-600';
        break;
    }
  }

  showToast(
    message: string,
    duration: number = 3000,
    type: 'success' | 'error' | 'info' | 'warning'
  ): void {
    this.message = message;
    this.type = type;
    this.show = true;
    this.setIconAndBorder();
    setTimeout(() => {
      this.show = false;
    }, duration);
  }
}
