import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Subject } from 'rxjs';
import { coerceBoolean } from './coerce-boolean';
import { CoreTableDataSource } from './data-source';
import { CoreTableFilterComponent } from './filter/filter.component';
import { CoreTableMenuComponent } from './menu/menu.component';

export class CoreTable<T> implements AfterViewInit, OnInit {
  // private _pending: boolean;

  @Output() select = new Subject<T[]>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild(CoreTableMenuComponent) tableMenu: CoreTableMenuComponent;
  @ViewChildren(CoreTableFilterComponent)
  filters: QueryList<CoreTableFilterComponent>;

  readonly columns: string[];
  dataSource: CoreTableDataSource<T>;
  displayedColumns: string[];

  get length(): number {
    return this.dataSource.data.length;
  }

  constructor(columns: string[]) {
    this.columns = columns;
    this.displayedColumns = columns;
  }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    if (this.filters.length && this.tableMenu == null) {
      // this just hides the table data by introducing a bogus filter.
      // not having a clear filters button hopefully makes the error obvious.
      this.dataSource.setFilter({
        key: '',
        predicate: () => null,
        valueFn: () => {},
      });
      // this notifies the error to the dev
      throw new Error(
        `<core-table-filter> usage requires a <core-table-menu> for user convenience`
      );
    }
  }

  private init() {
    // already init'd short-circuit/guard
    if (this.dataSource) {
      return;
    }

    this.dataSource = new CoreTableDataSource([], {
      sort: this.sort,
      paginator: this.paginator,
      viewport: this.viewport,
    });

    this.onInit();
  }

  clearFilters(): void {
    this.dataSource.clearFilters();
    this.filters.forEach((fc) => fc.filter.setValue(null));
  }

  filter(
    key: string,
    predicate: (value: any) => boolean,
    valueFn: (item: T) => any
  ): void {
    this.dataSource.setFilter({ key, predicate, valueFn });
  }

  /**
   * Override this method to execute during ngOnInit
   */
  protected onInit() {}

  /**
   * Sets the data for dataSource usage
   */
  protected set(data: T[]): void {
    this.init();
    this.dataSource.allData = data;
  }
}

function hasObservers(subject: Subject<any>): boolean {
  return subject.observers.length > 0;
}
