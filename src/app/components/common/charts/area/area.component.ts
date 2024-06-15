import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'AreaChart',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements AfterViewInit {
  @Input() data: { x: string; y: number }[] = [];
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';

  @ViewChild('chartSvg') chartSvg!: ElementRef<SVGElement>;

  chartWidth = 600;
  chartHeight = 300;
  margin = 50;
  maxDataValue = 0;

  tooltipValue: number | null = null;
  tooltipLabelX: string | null = null; // To store the x value for the tooltip
  tooltipX: number = 0;
  tooltipY: number = 0;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.calculateChartDimensions();
    this.maxDataValue = Math.max(...this.data.map((point) => point.y));
  }

  onResize(event: Event): void {
    this.calculateChartDimensions();
  }

  calculateChartDimensions(): void {
    const element = this.elementRef.nativeElement.querySelector('.relative');
    const width = element.offsetWidth;
    const height = 0.4 * width; // Adjust height as needed based on aspect ratio

    this.chartWidth = width;
    this.chartHeight = height;
  }

  generatePath(data: { x: string; y: number }[]): string {
    if (data.length === 0) {
      return '';
    }

    const path = data.reduce((acc, point, index) => {
      const x =
        (index * (this.chartWidth - 2 * this.margin)) / (data.length - 1);
      const y =
        this.chartHeight -
        this.margin -
        (point.y * (this.chartHeight - 2 * this.margin)) / this.maxDataValue;
      return `${acc} ${x},${y}`;
    }, `M0,${this.chartHeight - this.margin}`);

    return `${path} L${
      ((data.length - 1) * (this.chartWidth - 2 * this.margin)) /
      (data.length - 1)
    },${this.chartHeight - this.margin} Z`;
  }

  showTooltip(event: MouseEvent, point: { x: string; y: number }): void {
    const circle = event.target as SVGCircleElement;
    const rect = this.chartSvg.nativeElement.getBoundingClientRect();
    const svgX = event.clientX - rect.left;
    const svgY = event.clientY - rect.top;

    // Adjust tooltip position to be above the data point
    const tooltipOffsetX = -320; // Offset from the data point
    const tooltipOffsetY = -160; // Offset above the data point
    const cx = parseFloat(circle.getAttribute('cx') || '0');
    const cy = parseFloat(circle.getAttribute('cy') || '0');

    this.tooltipValue = point.y;
    this.tooltipLabelX = point.x;
    this.tooltipX = rect.left + svgX + tooltipOffsetX;
    this.tooltipY = rect.top + cy + tooltipOffsetY;
  }

  hideTooltip(): void {
    this.tooltipValue = null;
    this.tooltipLabelX = null;
  }
}
