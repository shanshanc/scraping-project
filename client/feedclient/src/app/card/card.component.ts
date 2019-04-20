import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `<div 
    gdAreas="header header | side content | footer footer"
    gdGap="16px"
    gdRows="auto auto auto"
    gdAreas.lt-md="header | side | content | footer"
    gdRows.lt-md="auto auto auto auto"
    >
    <div gdArea="header">
      Header
    </div>
    <div gdArea="side">
      Side
    </div>
    <div gdArea="content">
      Content
    </div>
    <div gdArea="footer">
      Footer
    </div>
  </div>`,
  styles: [`
  :host {
    display: block;
    padding: 32px;
    border: 1px solid black;
    border-radius: 8px;
  }
  `]
  // templateUrl: './card.component.html',
  // styleUrls: ['./card.component.css']
})
export class CardComponent {}
