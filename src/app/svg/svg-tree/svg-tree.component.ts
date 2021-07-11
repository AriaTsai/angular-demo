import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { Edge, Node, Layout, ClusterNode } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';

@Component({
  selector: 'svg-tree',
  templateUrl: './svg-tree.component.html',
  styleUrls: ['./svg-tree.component.scss']
})
export class SvgTreeComponent implements OnInit {

  curve: any = shape.curveStepAfter

  @Input() linksData: Edge[];
  @Input() nodeListData: Node[];
  @Input() clustersData: ClusterNode[];


  constructor() { }

  ngOnInit(): void {
    console.log(this.nodeListData)
  }


  onNodeSelect(event: any) {
    console.log('selected: ', event)
  }

}
