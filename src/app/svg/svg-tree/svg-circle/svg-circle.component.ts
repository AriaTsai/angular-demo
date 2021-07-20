import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-circle',
  templateUrl: './svg-circle.component.html',
  styleUrls: ['./svg-circle.component.scss']
})
export class SvgCircleComponent implements OnInit {

  @Input() size = 50;  //r
  @Input() color = '#ffffff';
  @Input() centerX = 50;
  @Input() centerY = 50;
  @Input() borderColor = '#000000';  //stroke color
  @Input() borderWidth = 1;  //stroke-width


  constructor() { }

  ngOnInit(): void {
  }

}
