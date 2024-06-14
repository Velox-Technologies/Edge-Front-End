import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'Modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() contentTemplate!: TemplateRef<any>;
  isOpen: boolean = false;

  openModal() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isOpen = false;
    document.body.style.overflow = '';
  }
}
