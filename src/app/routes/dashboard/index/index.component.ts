import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../components/common/modal/modal.component';
import { DrawerComponent } from '../../../components/common/drawer/drawer.component';
import { mockTableData } from '../../../utils/mockData/mockTableData';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @ViewChild(DrawerComponent) drawer!: DrawerComponent;
  @ViewChild('drawerContent') drawerContent!: TemplateRef<any>;

  steps = ['Create', 'Add Partners', 'Go!'];
  forms: FormGroup[] = [];
  canProceed: boolean[] = [false, false, true];
  chartData = [
    { x: 'January', y: 200 },
    { x: 'February', y: 350 },
    { x: 'March', y: 280 },
    { x: 'April', y: 450 },
    { x: 'May', y: 320 },
    { x: 'June', y: 400 },
    { x: 'July', y: 300 },
    { x: 'August', y: 380 },
    { x: 'September', y: 420 },
    { x: 'October', y: 370 },
    { x: 'November', y: 280 },
    { x: 'December', y: 350 },
  ];

  constructor(private titleService: Title, private fb: FormBuilder) {
    this.titleService.setTitle('Dashboard');
  }

  ngOnInit() {
    this.forms = [
      this.fb.group({
        businessName: ['', Validators.required],
      }),
      this.fb.group({
        partners: ['', Validators.required],
      }),
    ];

    this.forms.forEach((form, index) => {
      form.statusChanges.subscribe(() => {
        this.canProceed[index] = form.valid;
      });
    });
  }

  headers: string[] = [
    'trade_id',
    'stock_symbol',
    'quantity',
    'purchase_price',
    'purchase_date',
    'sale_date',
    'profit',
    'profit_percentage',
    'trade_type',
  ];
  data: any[] = mockTableData;

  openModal() {
    this.modal.openModal();
  }

  closeModal() {
    this.modal.closeModal();
  }

  openDrawer() {
    this.drawer.openDrawer();
  }

  closeDrawer() {
    this.drawer.closeDrawer();
  }

  lastStepNextFunction() {
    console.log('Executing custom function on last step next button click');
    if (this.forms && this.forms.length > 0) {
      // Reset form values
      this.forms.forEach((form) => form.reset());
    } else {
      // Handle case where forms is not yet initialized
      console.warn('Forms array is not yet initialized.');
    }
  }
}
