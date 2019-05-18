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

  margin = {top: 20, right: 20, bottom: 30, left: 45};

  constructor() { }

  ngOnChanges(): void {
    if (!this.records) {return;}
    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();
    const element = this.chartContainer.nativeElement;
    const feeddata = this.records;

    const height = 400;
    const width = 600;
    const barWidth = 35;
    const barStep = 50;
    const barOffset = 5;

    const maxYscale = 30;
    const xStart = Math.min.apply(null, feeddata.map(d => d.id));
    const xEnd = Math.max.apply(null, feeddata.map(d => d.id));

    const yScale = d3.scaleLinear()
      .domain([0, maxYscale])
      .range([0, height]);

    const xScale = d3.scaleTime()
      .domain([xStart, xEnd])
      .range([0, width]);

    // Create tooltip to show data
    const toolTip = d3.select(element)
      .append("div")
      .attr("class", "toolTip");

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit' };

    // Prepare canvas
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width -10)
      .attr('height', height);
    
    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // Draw axis - y
    const vScale = d3.scaleLinear()
      .domain([0, maxYscale])
      .rangeRound([height, 0]);
    
    g.append("g")
      .call(d3.axisLeft(vScale).ticks(null))
      .attr("transform", "translate(0, -40)");
      
    // Draw axis - x
    const hScale = d3.scaleTime()
      .domain([xStart, xEnd])
      .range([0, width]);
  
    g.append("g")
      .call(d3.axisBottom(hScale))
      .attr("transform", "translate(0, 365)");
    
    // Load data
    g.selectAll('rect')
        .data(feeddata)
        .enter()
        .append('rect')
          .attr('class', 'bar')
          .attr('width', barWidth)
          .attr('height', function(d) {
            return yScale(d.number_of_items);
          })
          .attr('x', function(d,i) {
            return i * (barWidth + barOffset) + 2;
          })
          .attr('y', function(d) {
            return height - yScale(d.number_of_items) -35;
          })
      .on('mouseover', function(d) {
        const dateTip = new Date(d.id).toLocaleDateString('en-gb', dateOptions);
        toolTip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 70 + "px")
          .style("display", "inline")
          .html(d.number_of_items + " products");
      });
  }
}
