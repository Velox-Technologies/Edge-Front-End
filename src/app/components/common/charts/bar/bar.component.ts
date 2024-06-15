import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

interface Bar {
  label: string;
  value: number;
  height: number; // Add height property
}

@Component({
  selector: 'BarChart',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements AfterViewInit {
  @Input() bars: Bar[] = [];
  @Input() yAxisLabel: string = '';
  @Input() xAxisLabel: string = ''; // New input for xAxisLabel
  @ViewChild('chartSvg') chartSvg!: ElementRef<SVGElement>;

  chartWidth = 600;
  chartHeight = 300;
  barWidth = 40;
  barPadding = 10;
  barMargin = 20;

  tooltipValue: number | null = null;
  tooltipLabel: string | null = null;
  tooltipX: number = 0;
  tooltipY: number = 0;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.calculateChartDimensions();
    this.calculateBarHeights();
  }

  onResize(event: Event): void {
    this.calculateChartDimensions();
    this.calculateBarHeights();
  }

  calculateChartDimensions(): void {
    const element = this.elementRef.nativeElement.querySelector('.relative');
    const width = element.offsetWidth;
    const height = 0.4 * width;

    this.chartWidth = width;
    this.chartHeight = height;
  }

  calculateBarHeights(): void {
    this.bars.forEach((bar) => {
      bar.height =
        (bar.value / this.getMaxValue()) * (this.chartHeight - this.barMargin);
    });
  }

  getMaxValue(): number {
    return Math.max(...this.bars.map((bar) => bar.value));
  }

  showTooltip(event: MouseEvent, bar: Bar): void {
    const rect = event.target as SVGRectElement;
    const rectBounds = rect.getBoundingClientRect();
    const svgBounds = this.chartSvg.nativeElement.getBoundingClientRect();

    this.tooltipValue = bar.value;
    this.tooltipLabel = bar.label;
    this.tooltipX = rectBounds.left - svgBounds.left + rectBounds.width / 45;
    this.tooltipY = rectBounds.top - svgBounds.top - 30;
  }

  hideTooltip(): void {
    this.tooltipValue = null;
    this.tooltipLabel = null;
  }
}
