import { Component, ContentChild, TemplateRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'Accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  animations: [
    trigger('accordionContent', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      transition('open <=> closed', [animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')]),
    ]),
  ],
})
export class AccordionComponent {
  @ContentChild('accordionTitle', { static: true })
  titleTemplate!: TemplateRef<any>;
  isOpen: boolean = false;

  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }
}
