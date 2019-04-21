import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatTableModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { FeedsComponent } from './feeds/feeds.component';
import { CardComponent } from './card/card.component';
import { HistoryComponent } from './history/history.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedsComponent,
    CardComponent,
    HistoryComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTableModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
