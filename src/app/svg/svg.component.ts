import { Component, OnInit } from '@angular/core';
import { Node } from '@swimlane/ngx-graph';


@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {

  relationLinks = [
    {
      id: 'a',
      source: '1',
      target: '2'
    },
    {
      id: 'b',
      source: '1',
      target: '3'
    },
    {
      id: 'c',
      source: '3',
      target: '4'
    },
    {
      id: 'd',
      source: '3',
      target: '5'
    },
    {
      id: 'f',
      source: '2',
      target: '6'
    }
    // {
    //   id: 'a',
    //   source: 'first',
    //   target: 'second',
    //   label: 'is parent of'
    // }, {
    //   id: 'b',
    //   source: 'first',
    //   target: 'third',
    //   label: 'custom label'
    // }
  ];


  nodeList: Node[] = [
    {
      id: '1',
      label: 'Node A',
      dimension: { width: 140, height: 50 },
      data: { customColor : '#ffffff', borderColor: 'rgba(0,0,0,0.6)' }
    },
    {
      id: '2',
      label: 'Node B',
      dimension: { width: 140, height: 50 },
    },
    {
      id: '3',
      label: 'Node C'
    },
    {
      id: '4',
      label: 'Node D'
    },
    {
      id: '5',
      label: 'Node E'
    },
    {
      id: '6',
      label: 'Node F'
    }
    // {
    //   id: 'first',
    //   label: 'A'
    // }, {
    //   id: 'second',
    //   label: 'B'
    // }, {
    //   id: 'third',
    //   label: 'C'
    // }
  ];

  clusters = [
    {
      id: 'cluster0',
      label: 'Cluster node0',
      childNodeIds: ['1']
    },
    {
      id: 'cluster1',
      label: 'Cluster node1',
      childNodeIds: ['2', '3'],
      dimension : { width: 150, height: 50 }
    },
    {
      id: 'cluster2',
      label: 'Cluster node2',
      childNodeIds: ['4', '5', '6']
    },
  ];



  constructor() { }

  ngOnInit(): void {
  }

  onNodeSelect(event: any) {
    console.log('selected', event)
  }
}
