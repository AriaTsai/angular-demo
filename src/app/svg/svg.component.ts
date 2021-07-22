import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClusterNode, DagreNodesOnlyLayout, Edge, Graph, Node } from '@swimlane/ngx-graph';
import { Orientation } from './svg-tree/customLayout';
import { clustersData, edgeData, nodeData, signClustersData, signLinksData, signNodesData } from './svg-tree/data';
import { BoSvgCircleNode, BoSvgNode, FlowChartGraphConfig, NodeCircleStyle, NodeCustomStyle, SvgTreeConfigBuilder } from './svg-tree/svg-tree-config-builder';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {

  target: string;
  treeData = new FlowChartGraphConfig();
  signData = new FlowChartGraphConfig();

  @ViewChild ('customTemplate', {static:true}) customTemplate :ElementRef<SVGAElement>;
  @ViewChild ('treeTemplate', {static:true}) treeTemplate :ElementRef<any>;

  constructor() {
  }

  ngOnInit(): void {
    console.log('init');
    this.createDepartMentTree();



    this.createSignChart();
  }

  createDepartMentTree() {
    nodeData.forEach(item => {
      item.dimension = {width:175, height:50}
    });


    const customStyle = new NodeCustomStyle()
    customStyle.template = this.treeTemplate

    this.treeData = new SvgTreeConfigBuilder()
      .setNodesData(nodeData).setLinksData(edgeData).setClustersData(clustersData)
      .setNodeStyle(customStyle)
      .setNodeSize(175, 50)
      .enableOrgGraph(true)
      .enableLinkArrow(false)
      .setViewPort(1500, 800)
      .setLinkArrowType('start')
      .build();
  }



  createSignChart() {
    // style: circle
    const circleStyle = new NodeCircleStyle()
    circleStyle.fillColor = '#a9a9a9';
    circleStyle.borderColor = 'rgba(169, 169, 169, 0.5)';
    circleStyle.size = 40;
    circleStyle.borderWidth = 20;

    // style: 自訂
    const customStyle = new NodeCustomStyle()
    customStyle.template = this.customTemplate

    this.signData = new SvgTreeConfigBuilder()
      .setNodesData(signNodesData).setLinksData(signLinksData).setClustersData(signClustersData)
      .setOrientation(Orientation.TOP_TO_BOTTOM)
      .setViewPort(1500, 800)
      .setNodeSize(150, 150)
      .setNodeStyle(circleStyle)
      .setLinkArrowType('start')
      .build();
  }

  moveItem(id: string) {

  }



//   createSignChart() {

//     const nodeGroup: BoSvgNode[] = [];
//     nodeData.forEach(item => {
//         // const circle = new BoSvgNodeCircleBuilder(item.id, item.label)
//         //     .setR(50)
//         //     .setColor('#a9a9a9')
//         //     .setBorderColor('rgba(169, 169, 169, 0.5)')
//         //     .setBorderWidth(10)
//         //     .setPadding(10)
//         //     .build();
//         // nodeGroup.push(circle);

//         // const rect = new BoSvgNodeRectBuilder(item.id, item.label)
//         // .setWidth(100)
//         // .setHeight(100)
//         // .setPadding(10)
//         // .setBorderWidth(30)
//         // .setColor('#a9a9a9')
//         // .setBorderColor('rgba(169, 169, 169, 0.5)')
//         // .build();
//         // nodeGroup.push(rect);

//         const custom = new BoSvgNodeCustomBuilder(item.id, item.label)
//             .setNodeTemplate(this.treeTemplate)
//             .setWidth(175)
//             .setHeight(50)
//             .build();
//         nodeGroup.push(custom);
//     });


//     const edgeGroup: BoSvgLink[] = [];
//     edgeData.forEach(item => {
//         const link = new BoSvgLinkBuilder()
//             .setLinkId(item.id)
//             .setSource(item.source)
//             .setTarget(item.target)
//             .setLinkWidth(1)
//             .build();

//         edgeGroup.push(link);
//     });



//     this.signData = new SvgTreeConfigBuilder()
//         .setNodesData(nodeGroup).setLinksData(edgeGroup).setClustersData(signClustersData)
//         .setOrientation(Orientation.LEFT_TO_RIGHT)
//         .enableLinkArrow(false)
//         .setViewPort(1200, 500) // 要符合container的大小(自動設定)
//         .setArrowSize(10)
//         .build();
// }


// move(node) {
//     console.log(node);

//     this.isInEditMode = true;
//     this.selectedNode  = node;

// }






}
