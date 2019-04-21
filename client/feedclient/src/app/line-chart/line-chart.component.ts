import { Component, OnInit, ElementRef, Input, OnChanges, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { Record } from '../record.model';

@Component({
  selector: 'app-line-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {
  @ViewChild('chart')

  private chartContainer: ElementRef;

  @Input()
  records: Record[];
  
  margin = {top: 20, right: 20, bottom: 30, left: 40};

  constructor() { }
  // ngOnInit() {
  // }
  ngOnChanges(): void {
    if (!this.records) {return;}
    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.records;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);
    
    const contentWidth = element.offetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    // const x = d3
    //   .scaleBand()
    //   .rangeRound([0, contentWidth])
    //   .padding(0.1)
    //   .domain(data.map(d => d.id.toString()));
      
    // const y = d3
    //   .scaleLinear()
    //   .rangeRound([contentHeight, 0])
    //   .domain([0, d3.max(data, d => d.number_of_items)]);

    // Create and transform group element
    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    
    // Add scales
    const x = d3
      .scaleTime()
      .rangeRound([0, contentWidth])
      .domain(d3.extent(data, d => d.id));
    
    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain(d3.extent(data, d => d.number_of_items));

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(5, 'i'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Number of Items');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.id))
        .attr('y', d => y(d.number_of_items))
        .attr('width', 500)
        .attr('height', d => contentHeight - y(d.number_of_items));

  }

}
