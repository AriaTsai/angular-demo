import { ElementRef, TemplateRef } from '@angular/core';
import { ArrowType, BoSvgLink } from '@shared/bo-svg-tree/bo-svg-link/bo-svg-link-builder';
import {
    Edge, Node, ClusterNode, PanningAxis, Graph,
    Orientation, Alignment, NodeDimension, NodePosition, DagreNodesOnlySettings
} from '@swimlane/ngx-graph';


export interface NodeStyle {
    shape?: 'rect' | 'circle' | 'customNode';
    r?: number;
    size?: number;
    fillColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadious?: number;
    template?: ElementRef<any>;
}

export class BoSvgNode implements Node {
    id: string;
    label: string;
    data?: NodeStyle;
    meta: any;
}


export class SvgTreeGraphConfig {
    viewPort: [number, number];
    nodesData: BoSvgNode[];
    linksData: BoSvgLink[];
    clustersData: ClusterNode[];
    nodeWidth: number;
    nodeHeight: number;
    nodeShape: 'rect' | 'circle';
    settings: DagreNodesOnlySettings; // 設置
    useLinkArrow: boolean;
    arrowSize: number;

    constructor() {
        this.viewPort = [1280, 500];
        this.nodesData = [];
        this.linksData = [];
        this.clustersData = [];
        // this.nodeWidth = 170;
        // this.nodeHeight = 120;
        this.nodeShape = 'circle';
        this.settings = {
            orientation: Orientation.LEFT_TO_RIGHT,
            marginX: 20,
            marginY: 50,
            edgePadding: 50,
            rankPadding: 50,
            nodePadding: 50,
        };
        this.useLinkArrow = true;
        this.arrowSize = 10;
    }
}


export class SvgTreeConfigBuilder {
    svgTreeGraphConfig: SvgTreeGraphConfig;

    constructor() {
        this.svgTreeGraphConfig = new SvgTreeGraphConfig();
    }

    setViewPort(width: number, height: number): SvgTreeConfigBuilder {
        this.svgTreeGraphConfig.viewPort[0] = width;
        this.svgTreeGraphConfig.viewPort[1] = height;
        return this;
    }

    // setNodeSize(width: number, height: number): SvgTreeConfigBuilder {
    //     // this.svgTreeGraphConfig.nodeWidth = width;
    //     // this.svgTreeGraphConfig.nodeHeight = height;
    //     return this;
    // }

    setNodesData(nodesData: BoSvgNode[]): SvgTreeConfigBuilder {
        this.svgTreeGraphConfig.nodesData = nodesData;
        return this;
    }

    // setNodeStyle(nodeStyle: NodeCircleStyle | NodeRectStyle | NodeCustomStyle): SvgTreeConfigBuilder {
    //     this.svgTreeGraphConfig.nodesData.forEach(item => {
    //         item.data = nodeStyle;
    //     });
    //     return this;
    // }

    setLinksData(linksData: BoSvgLink[]): SvgTreeConfigBuilder {
        this.svgTreeGraphConfig.linksData = linksData;
        return this;
    }

    setClustersData(clustersData: ClusterNode[]): SvgTreeConfigBuilder {
        this.svgTreeGraphConfig.clustersData = clustersData;
        return this;
    }

    setOrientation(orientation: Orientation): SvgTreeConfigBuilder {
        this.svgTreeGraphConfig.settings.orientation = orientation;
        return this;
    }

    // setNodeShape(shape: 'rect' | 'circle'): SvgTreeConfigBuilder {
    //   this.svgTreeGraphConfig.nodeShape = shape;
    //   return this;
    // }

    enableLinkArrow(useArrow: boolean): SvgTreeConfigBuilder {
        this.svgTreeGraphConfig.useLinkArrow = useArrow;
        return this;
    }

    setLinkArrowType(arrowType: ArrowType): SvgTreeConfigBuilder {
        this.svgTreeGraphConfig.linksData.forEach(item => {
            if (item.data) {
                item.data.arrowType = arrowType;
            }
        });
        return this;
    }

    setArrowSize(size: number): SvgTreeConfigBuilder {
        this.svgTreeGraphConfig.arrowSize = size;
        return this;
    }

    public build(): any {
        return Object.assign(new SvgTreeGraphConfig(), this.svgTreeGraphConfig);
    }
}
