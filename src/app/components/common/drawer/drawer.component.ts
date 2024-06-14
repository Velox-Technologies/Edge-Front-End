import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'Drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent {
  @Input() titleTemplate!: TemplateRef<any>;
  @Input() contentTemplate!: TemplateRef<any>;
  @Input() position: 'left' | 'right' = 'right';
  isOpen: boolean = false;

  openDrawer() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    this.isOpen = false;
    document.body.style.overflow = '';
  }
}
