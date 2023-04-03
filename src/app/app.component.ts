import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { Example } from './example-table/example';
import { names } from './names';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  delay = 2000;
  examples: Observable<Example[]>;
  pending: Observable<boolean>;
  // sticky: boolean;

  constructor() {
    this.fetch();
  }

  fetch() {
    this.examples = of(
      names.map((name, i) => ({ id: i + 1, name }))
    ).pipe(
      delay(this.delay),
      startWith([])
    );
    this.pending = this.examples.pipe(
      map(data => data.length === 0)
    );
  }
}
