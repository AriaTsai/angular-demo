import { ElementRef, TemplateRef } from '@angular/core';
import { Edge, Node, Layout, ClusterNode, PanningAxis, GraphComponent, Graph,
  DagreClusterLayout, DagreSettings, Orientation, Alignment, NodeDimension, NodePosition } from '@swimlane/ngx-graph';

// Node Style
interface NodeStyle {
    shape?: 'rect' | 'circle' | 'customNode';
    size?: number;
    fillColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadious?: number;
    template?: ElementRef<SVGAElement>;
}
export class NodeRectStyle implements NodeStyle{
  readonly shape =  'rect'
  fillColor = '#ffffff';
  borderColor = '#000000';
  borderWidth = 1;
  borderRadious = 5;
}
export class NodeCircleStyle implements NodeStyle{
  readonly shape =  'circle'
  size = 50 //r
  fillColor = '#ffffff';
  borderColor = '#000000';
  borderWidth = 1;
}
export class NodeCustomStyle implements NodeStyle{
  readonly shape =  'customNode'
  template?: ElementRef<any>;
}



// Node
export class BoSvgNode implements Node {
  id: string;
  position?: NodePosition;
  dimension?: NodeDimension;
  label: string;
  data?: NodeStyle;
}
// export class BoSvgRectNode extends BoSvgNode {
//   readonly id: string;
//     data?: NodeRectStyle;

//   constructor(id:string, config?:{position,dimension}){
//     super();
//     this.id = id;
//     this.data = new NodeRectStyle()
//   }
// }
export class BoSvgCircleNode extends BoSvgNode {
  readonly id: string;
  data?: NodeCircleStyle;

  constructor(id:string){
    super();
    this.id = id;
    this.data = new NodeCircleStyle()
  }
}


// edge
export class BoLinkStyle {
  width: number;
  arrowType: 'start'|'end'|'both';
  constructor(){
    this.width = 1;
    this.arrowType = 'end'
  }
}

export class BoSvgLink implements Edge {
  id?: string;
  source: string;
  target: string;
  label?: string;
  data?: BoLinkStyle;
  points?: any;
}




export class FlowChartGraphConfig {
  viewPort: [number, number];
  nodesData: BoSvgNode[];
  linksData: BoSvgLink[];
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
      nodePadding: 30,
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

  setViewPort(width: number, height: number): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.viewPort[0] = width;
    this.flowChartGraphConfig.viewPort[1] = height;
    return this;
  }

  setNodeSize(width: number, height: number): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.nodeWidth = width;
    this.flowChartGraphConfig.nodeHeight = height;
    return this;
  }

// node
  setNodesData(nodesData: BoSvgNode[]): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.nodesData = nodesData;
    return this;
  }

  setNodeStyle(nodeStyle: NodeStyle): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.nodesData.forEach(item => {
      item.data = nodeStyle
    })
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

  // setNodeShape(shape: 'rect' | 'circle'): SvgTreeConfigBuilder {
  //   this.flowChartGraphConfig.nodeShape = shape;
  //   return this;
  // }

  enableLinkArrow(useArrow: boolean): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.useLinkArrow = useArrow;
    return this;
  }

  setLinkArrowType(arrowType: 'start'|'end'|'both'): SvgTreeConfigBuilder {
    this.flowChartGraphConfig.linksData.forEach(item => {
      if (item.data) {
        item.data.arrowType = arrowType
      }
    })
    return this;
  }

  enableOrgGraph(useOrg: boolean): SvgTreeConfigBuilder {
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
