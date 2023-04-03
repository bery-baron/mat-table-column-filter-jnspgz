import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  MatCheckboxModule,
  MatProgressBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { CoreTableFilterModule } from '../core-table/filter/filter.module';
import { CoreTableMenuModule } from '../core-table/menu/menu.module';
import { CoreTableVirtualScrollModule } from '../core-table/virtual-scroll/virtual-scroll.module';
import { ExampleTableComponent } from './example-table.component';

const components = [ExampleTableComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    BrowserModule,
    CoreTableFilterModule,
    CoreTableMenuModule,
    CoreTableVirtualScrollModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    ScrollingModule
  ],
})
export class ExampleTableModule { }
