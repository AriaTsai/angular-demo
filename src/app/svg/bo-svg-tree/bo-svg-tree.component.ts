import { Component, Input, OnInit } from '@angular/core';
import { ClusterNode, DagreNodesOnlySettings, Orientation, PanningAxis } from '@swimlane/ngx-graph';

import { Subject } from 'rxjs';
import { curveStepAfter } from 'd3-shape';
import { select } from 'd3-selection';

import { BoSvgLayout } from './bo-svg-layout';
import { SvgTreeGraphConfig } from '@shared/bo-svg-tree/bo-svg-tree-config-builder';
import { ArrowType } from '@shared/bo-svg-tree/bo-svg-link/bo-svg-link-builder';


@Component({
    selector: 'bo-svg-tree',
    templateUrl: './bo-svg-tree.component.html',
    styleUrls: ['./bo-svg-tree.component.scss']
})
export class BoSvgTreeComponent implements OnInit {

    @Input() svgTreeGraphConfig: SvgTreeGraphConfig;

    layout = new BoSvgLayout();
    curve: any = curveStepAfter; // curve 樣式

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

    orientation = Orientation;
    arrowType = ArrowType;

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
    _targetNode: string;


    constructor() { }

    ngOnInit(): void {
        console.log(this.svgTreeGraphConfig);


        this.createSticky(this.svgTreeGraphConfig.clustersData);
        this.setClusterLineTranslate(this.svgTreeGraphConfig.nodeWidth, this.svgTreeGraphConfig.settings);

    }


    createSticky(clustersData: ClusterNode[]) {
        // 樣式：自訂 or sticky-bar
        // sticky-bar 可改變fill,text
        const shap = 'rect';
        const ngxCharts = select('.ngx-charts');
        const group = ngxCharts.append('g')
            .attr('width', this.svgTreeGraphConfig.viewPort[0])
            .attr('height', 50)
            .attr('class', 'header');

        // 背景
        group
            .append(shap)
            .attr('width', this.svgTreeGraphConfig.viewPort[0])
            .attr('height', 50)
            .attr('fill', 'rgba(0,0,0,0.1)');

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

    }

    setClusterLineTranslate(nodeWidth: number, setting?: DagreNodesOnlySettings) {
        if (setting?.rankPadding) {
            this.clusterLineTranslate = `translate(${(nodeWidth + setting.rankPadding) / 2}, -1000)`;
        } else {
            this.clusterLineTranslate = `translate(${nodeWidth / 2}, -1000)`;
        }
    }


    onNodeSelect(event: any) {
        console.log('selected: ', event);
    }

    centerHandler() {
        this.center$.next(true);
    }

    fitHandler() {
        this.zoomToFit$.next(true);
    }

    panToNode(id: string) {
        this.panToNode$.next(id);
    }

    moveItem(id: string) {
        // 點擊移動模式
    }


}
