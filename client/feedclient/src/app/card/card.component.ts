import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `<div 
    gdGap="16px"
    gdRows="auto auto auto"
    >
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
