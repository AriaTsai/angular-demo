import { Component, OnInit, Input, ViewChild, TemplateRef, ElementRef, Renderer2, ViewContainerRef, Output } from '@angular/core';
import {
  Edge, Node, Layout, ClusterNode, PanningAxis, GraphComponent, Graph,
  DagreClusterLayout, DagreSettings, Orientation, D3ForceDirectedLayout
} from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import * as selection from 'd3-selection';
import * as zoom from 'd3-zoom';
// import * as d3 from 'd3';
import { Subject } from 'rxjs';
import { CustomLayout } from './customLayout';
import { FlowChartGraphConfig } from './svg-tree-config-builder';
// import { zoom } from 'd3-zoom';


@Component({
  selector: 'app-svg-tree',
  templateUrl: './svg-tree.component.html',
  styleUrls: ['./svg-tree.component.scss']
})
export class SvgTreeComponent implements OnInit {

  public layout: Layout = new CustomLayout();

  @Input() flowChartGraphConfig: FlowChartGraphConfig;

  curve: any = shape.curveStepAfter; // curve 樣式

  center$: Subject<boolean> = new Subject();  // 回到圖片中央
  zoomToFit$: Subject<boolean> = new Subject();  // viewbox = viewport 若圖片很大的話會被塞進框裡
  panToNode$: Subject<string> = new Subject();   // 定位

  draggingEnabled = false;  // 是否可拖拉node元件
  panningEnabled = true;  // 圖片是否可移動(viewbox)
  panningAxis: PanningAxis = PanningAxis.Vertical; // 圖片移動方向
  panOnZoom = false; // 依據滑鼠放置的位置縮放圖片
  enableZoom = true; // 是否可縮放
  showMiniMap = true; // 開啟mini map


  clusterLineTranslate: string;
  useOrgTemplate = false;

  @Input()
  get targetNode(): string {
    return this._targetNode;
  }
  set targetNode(id) {
    if (id != null) {
      this.panToNode(id);
      this._targetNode = id;
    }
  }
  // tslint:disable-next-line: variable-name
  _targetNode: string;


  constructor(private render2: Renderer2) {
  }

  ngOnInit(): void {
    console.log(this.flowChartGraphConfig);
    this.useOrgTemplate = this.flowChartGraphConfig.useOrgTemplate;


    if (this.flowChartGraphConfig.useOrgTemplate) {
      this.createSticky(this.flowChartGraphConfig.clustersData);
      this.setClusterLineTranslate(this.flowChartGraphConfig.nodeWidth, this.flowChartGraphConfig.settings);
    }
  }

  onNodeSelect(event: any): void {
    console.log('selected: ', event);
  }

  centerHandler(): void {
    this.center$.next(true);
  }

  fitHandler(): void {
    this.zoomToFit$.next(true);
  }

  panToNode(id: string): void {
    this.panToNode$.next(id);
  }

  moveItem(id: string): void {
    // 點擊移動模式
  }


  createSticky(clustersData: ClusterNode[]): void {
    // 樣式：自訂 or sticky-bar
    // sticky-bar 可改變fill,text
    const shap = 'rect';
    const ngxCharts = selection.select('.ngx-charts')
    const group = ngxCharts.append('g')
    .attr('width', this.flowChartGraphConfig.viewPort[0])
    .attr('height', 50)
    .attr('class', 'header');

    // 背景
    group
      .append(shap)
      .attr('width', this.flowChartGraphConfig.viewPort[0])
      .attr('height', 50)
      .attr('fill', 'rgba(0,0,0,0.1)')

    // 文字
    const groupText = group.append('g').attr('width', 50).attr('height', 30).attr('class', 'content');
    clustersData.forEach((cluster, index) => {
      // 文字背景
      groupText
        .append('rect')
        .attr('width', 45)
        .attr('height', 25)
        .attr('fill', '#f7f7f7')
        .attr('x', 95.5 + (200 * index))
        .attr('y', 22 / 3)
        .attr('rx', 10)
        .attr('ry', 10);
      // 內容
      groupText
        .append('text')
        .attr('width', 40)
        .attr('height', 20)
        .attr('fill', 'black')
        .attr('x', 95.5 + (200 * index))
        .attr('y', 22)
        .text(`${cluster.label}`);
    });

    // const header = selection.select<SVGSVGElement, unknown>('.header')
    // const content = selection.select<SVGSVGElement, unknown>('.content')


    // const useZoom = zoom.zoom<SVGSVGElement, unknown>()
    // .scaleExtent([1, 2]) // 縮放比例[最小值,最大值]
    // .filter(s=> {
    //   console.log(s)
    //   return true;
    // })
    // .extent([[0, 0], [this.flowChartGraphConfig.viewPort[0], 50]])
    // .on("zoom", e => {
    //   console.log(e)
    //   content.attr('transform', e.transform);
    // });

    // console.log(header);
    // header
    //   .call(useZoom)
    //   .call(useZoom.transform, zoom.zoomIdentity)
    //   .node()



    // console.log(useZoom);

  }

  setClusterLineTranslate(nodeWidth: number, setting?: DagreSettings): void {
    if (setting?.rankPadding) {
      this.clusterLineTranslate = `translate(${(nodeWidth + setting.rankPadding) / 2}, -1000)`;
    } else {
      this.clusterLineTranslate = `translate(${nodeWidth / 2}, -1000)`;
    }
  }

}
