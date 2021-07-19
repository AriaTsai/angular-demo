import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-rect',
  templateUrl: './svg-rect.component.html',
  styleUrls: ['./svg-rect.component.scss']
})
export class SvgRectComponent implements OnInit {

  @Input() color = '#ffffff';
  @Input() width = 100;
  @Input() height = 100;
  @Input() borderColor = '#000000';  //stroke color
  @Input() borderWidth = 1;  //stroke-width
  @Input() borderRadious= 5; //rx ry

  constructor() { }

  ngOnInit(): void {
  }

}
