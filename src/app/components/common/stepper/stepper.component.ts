import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'Stepper',
  templateUrl: './stepper.component.html',
})
export class StepperComponent {
  @Input() steps: string[] = [];
  @Input() canProceed: boolean[] = [];
  @Input() showStepper: boolean = true;
  @Input() onLastStepNext: (() => void) | undefined;
  currentStep = 0;

  @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      // Last step reached
      if (this.onLastStepNext) {
        this.onLastStepNext();
      }
      this.reset();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  reset() {
    this.currentStep = 0;
  }
}
