import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  ary = [1, 2, 3, 4];
  constructor() { }

  ngOnInit(): void {
    console.log('layout');
    console.log(_.forEach(this.ary, (item) => { console.log(item); }));
    this.counter();
  }

  counter(): void {
    interval(500).pipe(take(4)).subscribe((v) => {console.log(v); });
  }
}
