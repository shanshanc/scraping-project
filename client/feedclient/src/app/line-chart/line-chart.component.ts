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

  ngOnChanges(): void {
    if (!this.records) {return;}
    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.records;
    
    const width = 600 
    const height = 400

    const svg = d3.select(element)
      .append('svg')
      .attr('width', 400)
      .attr('height', height);
    
    const contentWidth = element.offetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const padding = { 
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        } 
    var graphicHeight = height - padding.top - padding.bottom
    const rectStep = 50 
    const rectWidth = 30 
    const maxValue = 30 
    
    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // Create tooltip to show data
    const toolTip = d3.select(element)
      .append("div")
      .attr("class", "toolTip");
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric',
                          hour: '2-digit', minute: '2-digit', second: '2-digit' };

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append("rect")
      .attr("fill", "#f78fa4")
      .attr("x", function(d,i){
          return padding.left + i * rectStep
      })
      .attr("height", height)
      .on("mouseover", function(d){
        const dateTip = new Date(d.id).toLocaleDateString('en-gb', dateOptions);
        // console.log('id:', d.id, '. dateTip: ', dateTip);
        toolTip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 70 + "px")
          .style("display", "inline")
          .html(dateTip + "<br>" + (d.number_of_items) + " products");
    })
      .on("mouseout", function(d) {
        // toolTip.style("display", "none");
      })
      .transition()
      .duration(2000)
      .attr("y", function(d){
        return height - padding.bottom - graphicHeight * (d.number_of_items / maxValue) // 畫面高度扣掉長條圖高度作為繪製長條圖的起點
      })
      .attr("width", rectWidth)
      .attr("height", function(d){
        return graphicHeight * (d.number_of_items / maxValue) // 使用maxValue最大值作為畫面高度100%計算該筆資料佔畫面的百分比
      })
      ;
      
    d3.select(element)
      .transition()
      .duration(1000)
      .style("background-color", "#f5f5f5")
  }
}
