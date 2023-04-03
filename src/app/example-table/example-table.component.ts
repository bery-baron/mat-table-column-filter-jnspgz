import { Component, Input } from '@angular/core';
import { CoreTable } from '../core-table/table';
import { Example } from './example';

@Component({
  selector: 'my-example-table',
  templateUrl: './example-table.component.html',
  styleUrls: ['./example-table.component.scss'],
})
export class ExampleTableComponent extends CoreTable<Example> {
  @Input()
  set examples(examples: Example[]) {
    // sets dataSource on CoreTable
    this.set(examples);
  }

  // @Input() sticky: boolean;

  constructor() {
    // column definitions for CoreTable
    super(['id', 'name', 'actions']);
  }

  onInit() {
    // this is how you could recalculate the sticky header position on scroll
    // this.viewport.renderedRangeStream.subscribe(() => {
    //   const el = this.viewport.elementRef.nativeElement;
    //   // the magicNumber can be calculated using all of:
    //   // el.scrollTop; el.clientHeight; rowHeight; viewport.offset.
    //   // but it's a hassle so let's just fix a pretty ok one here
    //   const magicNumber = 312;
    //   const offset = Math.min(magicNumber, this.viewport.getOffsetToRenderedContentStart());
    //   el.style.setProperty('--offset', `-${offset}px`);
    // });
  }
}
