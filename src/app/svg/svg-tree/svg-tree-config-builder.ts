import { Edge, Node, Layout, ClusterNode, PanningAxis, GraphComponent, Graph,
  DagreClusterLayout, DagreSettings, Orientation, Alignment } from '@swimlane/ngx-graph';

export interface NodeStyle {
    shape?: 'rect' | 'circle';
    color?: string;
    width?: number;
    height?: number;
    borderColor?: string;
    borderWidth?: number;
    borderRadious?: number;
}

export interface Nodes extends Node {
  data?: NodeStyle;
}


export class FlowChartGraphConfig {
  viewPort: [number, number];
  nodesData: Node[];
  linksData: Edge[];
  clustersData: ClusterNode[];
  nodeWidth: number;
  nodeHeight: number;
  nodeShape: 'rect' | 'circle';
  settings: DagreSettings; // 設置
  useLinkArrow: boolean;
  useOrgTemplate: boolean;


  constructor() {
    this.viewPort = [1280, 500];
    this.nodesData = [];
    this.linksData = [];
    this.clustersData = [];
    this.nodeWidth = 170;
    this.nodeHeight = 45;
    this.nodeShape = 'circle';
    this.settings = {
      orientation: Orientation.LEFT_TO_RIGHT,
      marginX: 20,
      marginY: 20,
      edgePadding: 20,
      rankPadding: 50,
      nodePadding: 10,
    };
    this.useLinkArrow = true;
    this.useOrgTemplate = false;
  }
}


export class SvgTreeConfigBuilder {
  flowChartGraphConfig: FlowChartGraphConfig;

  constructor(){
    this.flowChartGraphConfig = new FlowChartGraphConfig();
  }

  setViewPort(view: [number, number]): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.viewPort = view;
    return this;
  }

  setNodeSize(width: number, height: number): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.nodeHeight = height;
    this.flowChartGraphConfig.nodeWidth = width;
    return this;
  }

  setNodesData(nodesData: Node[]): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.nodesData = nodesData;
    return this;
  }

  setLinksData(linksData: Edge[]): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.linksData = linksData;
    return this;
  }

  setClustersData(clustersData: ClusterNode[]): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.clustersData = clustersData;
    return this;
  }

  setOrientation(orientation: Orientation): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.settings.orientation = orientation;
    return this;
  }

  setNodeShape(shape: 'rect' | 'circle'): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.nodeShape = shape;
    return this;
  }

  enableLinkArrow(useArrow: boolean): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.useLinkArrow = useArrow;
    return this;
  }


  // 使用已有的node樣式（）

  // 開啟stiky的區塊 放置位置

  enableOrgGraph(useOrg: boolean): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.useOrgTemplate = useOrg;
    this.flowChartGraphConfig.useLinkArrow = false;  // 關閉箭頭
    this.flowChartGraphConfig.settings = {
      orientation: Orientation.LEFT_TO_RIGHT,
      marginX: 20,
      marginY: 50,
      edgePadding: 15,
      rankPadding: 15, // 上下層 (第一個左邊為7.5)
      nodePadding: 10, // 同層
    };

    return this;
  }

  public build(): any{
    return Object.assign(new FlowChartGraphConfig(), this.flowChartGraphConfig);
  }
}
