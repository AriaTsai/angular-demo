import { Component, OnInit } from '@angular/core';
import { ClusterNode, DagreNodesOnlyLayout, Edge, Graph, Node } from '@swimlane/ngx-graph';
import { Orientation } from './svg-tree/customLayout';
import { clustersData, edgeData, nodeData, signClustersData, signLinksData, signNodesData } from './svg-tree/data';
import { FlowChartGraphConfig, SvgTreeConfigBuilder } from './svg-tree/svg-tree-config-builder';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {

  // nodeData: Node[] = [];
  // linksData: Edge[] = [];
  // clustersData: ClusterNode[] = [];
  target: string;
  treeData = new FlowChartGraphConfig();
  signData = new FlowChartGraphConfig();

  constructor() {
    nodeData.forEach(item => {
      item.data = {
        customColor: '#ffffff',
        borderWidth: '0.3',
        borderColor: 'rgba(0,0,0,0.6)',
        circleColor: '#d8f3ff',
        icon: 'more_vert',
      };
    });

    this.treeData = new SvgTreeConfigBuilder()
      .setNodesData(nodeData).setLinksData(edgeData).setClustersData(clustersData)
      .enableOrgGraph(true)
      .setNodeShape('rect')
      .setViewPort([1500, 800])
      .build();

    // this.treeData = new SvgTreeConfigBuilder()
    //   .setNodesData(nodeData).setLinksData(edgeData).setClustersData(clustersData)
    //   .setNodeSize(100, 100)
    //   .setNodeShape('rect')
    //   .build();

    this.signData = new SvgTreeConfigBuilder()
      .setNodesData(signNodesData).setLinksData(signLinksData).setClustersData(signClustersData)
      .setOrientation(Orientation.TOP_TO_BOTTOM)
      .setViewPort([1500, 800])
      .setNodeSize(100, 100)
      .build();

  }

  ngOnInit(): void {
    console.log('init');
  }


}
