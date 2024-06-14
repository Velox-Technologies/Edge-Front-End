import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../components/common/modal/modal.component';
import { DrawerComponent } from '../../../components/common/drawer/drawer.component';
import { mockTableData } from '../../../utils/mockData/mockTableData';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @ViewChild(DrawerComponent) drawer!: DrawerComponent;
  @ViewChild('drawerContent') drawerContent!: TemplateRef<any>;

  constructor(private titleService: Title) {
    this.titleService.setTitle('Dashboard');
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
}
