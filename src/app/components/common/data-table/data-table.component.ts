import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'Data-Table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnChanges {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Input() pageSize: number = 10;
  currentPage: number = 1;
  displayedData: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['pageSize']) {
      this.updateDisplayedData();
    }
  }

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.data.length);
    this.displayedData = this.data.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number) {
    const totalPages = this.totalPages;
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      this.currentPage = pageNumber;
      this.updateDisplayedData();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  changePageSize(event: any) {
    const newPageSize = parseInt(event?.target?.value, 10) || 10;
    if (this.pageSize !== newPageSize) {
      this.pageSize = newPageSize;
      this.currentPage = 1;
      this.updateDisplayedData();
    }
  }

  formatHeader(header: string): string {
    return header
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
