import { Graph, Layout, Edge, ClusterNode, NodePosition, NodeDimension, Node } from '@swimlane/ngx-graph';
import * as dagre from 'dagre';

export enum Orientation {
  LEFT_TO_RIGHT = 'LR',
  RIGHT_TO_LEFT = 'RL',
  TOP_TO_BOTTOM = 'TB',
  BOTTOM_TO_TOM = 'BT'
}
export enum Alignment {
  CENTER = 'C',
  UP_LEFT = 'UL',
  UP_RIGHT = 'UR',
  DOWN_LEFT = 'DL',
  DOWN_RIGHT = 'DR'
}

export interface DagreSettings {
  orientation?: Orientation; // 延展方向
  marginX?: number;
  marginY?: number;
  edgePadding?: number;
  rankPadding?: number;
  nodePadding?: number;
  align?: Alignment;
  acyclicer?: 'greedy' | undefined;
  ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
  multigraph?: boolean;
  compound?: boolean;
}

export interface DagreNodesOnlySettings extends DagreSettings {
  curveDistance?: number;
}

const DEFAULT_EDGE_NAME = '\x00';
const GRAPH_NODE = '\x00';
const EDGE_KEY_DELIM = '\x01';

export class CustomLayout implements Layout {
  defaultSettings: DagreNodesOnlySettings = {
    orientation: Orientation.LEFT_TO_RIGHT,
    marginX: 20,
    marginY: 20,
    edgePadding: 15,
    rankPadding: 15,
    nodePadding: 10,
    curveDistance: 20,
    multigraph: false,
    compound: true
  };
  settings: DagreNodesOnlySettings = {};

  dagreGraph: any;
  dagreNodes: any;
  dagreEdges: any;
  dagreClusters: ClusterNode[];

  public run(graph: Graph): Graph {
    this.createDagreGraph(graph);
    dagre.layout(this.dagreGraph);
    graph.edgeLabels = this.dagreGraph._edgeLabels;

    for (const dagreNodeId in this.dagreGraph._nodes) {
      if (this.dagreGraph._nodes.hasOwnProperty(dagreNodeId)) {
        const dagreNode = this.dagreGraph._nodes[dagreNodeId];
        const node = graph.nodes.find(n => n.id === dagreNode.id);
        if (node?.position || node?.dimension) {
          node.position = {
            x: dagreNode.x,
            y: dagreNode.y
          };
          node.dimension = {
            width: dagreNode.width,
            height: dagreNode.height
          };
        }
      }
    }

    const dagreToOutput = (node: any) => {
      const dagreNode = this.dagreGraph._nodes[node.id];
      return Object.assign(Object.assign({}, node), {
        position: {
          x: dagreNode.x,
          y: dagreNode.y
        }, dimension: {
          width: dagreNode.width,
          height: dagreNode.height
        }
      });
    };
    graph.clusters = (graph.clusters || []).map(dagreToOutput);

    for (const edge of graph.edges) {
      this.updateEdge(graph, edge);
    }

    return graph;
  }

  public updateEdge(graph: Graph, edge: Edge): Graph {
    const sourceNode = graph.nodes.find(n => n.id === edge.source);
    const targetNode = graph.nodes.find(n => n.id === edge.target);
    const rankAxis: 'x' | 'y' = this.settings.orientation === 'BT' || this.settings.orientation === 'TB' ? 'y' : 'x';
    const orderAxis: 'x' | 'y' = rankAxis === 'y' ? 'x' : 'y';
    const rankDimension = rankAxis === 'y' ? 'height' : 'width';

    if (sourceNode?.position && targetNode?.position && sourceNode.dimension && targetNode.dimension) {

      // determine new arrow position
      const dir = sourceNode.position[rankAxis] <= targetNode.position[rankAxis] ? -1 : 1;
      const startingPoint = {
        [orderAxis]: sourceNode.position[orderAxis],
        [rankAxis]: sourceNode.position[rankAxis] - dir * (sourceNode.dimension[rankDimension] / 2)
      };
      const endingPoint = {
        [orderAxis]: targetNode.position[orderAxis],
        [rankAxis]: targetNode.position[rankAxis] + dir * (targetNode.dimension[rankDimension] / 2)
      };

      const curveDistance = this.settings.curveDistance || this.defaultSettings.curveDistance;
      // generate new points
      edge.points = [
        startingPoint,
        {
          [rankAxis]: (startingPoint[rankAxis] + endingPoint[rankAxis]) / 2,
          [orderAxis]: startingPoint[orderAxis]
        },
        {
          [orderAxis]: endingPoint[orderAxis],
          [rankAxis]: (startingPoint[rankAxis] + endingPoint[rankAxis]) / 2,
        },
        endingPoint
      ];
    }
    const edgeLabelId = `${edge.source}${EDGE_KEY_DELIM}${edge.target}${EDGE_KEY_DELIM}${DEFAULT_EDGE_NAME}`;
    const matchingEdgeLabel = graph.edgeLabels[edgeLabelId];
    if (matchingEdgeLabel) {
      matchingEdgeLabel.points = edge.points;
    }
    return graph;
  }

  public createDagreGraph(graph: Graph): any {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    this.dagreGraph = new dagre.graphlib.Graph({ compound: settings.compound, multigraph: settings.multigraph });
    this.dagreGraph.setGraph({
      rankdir: settings.orientation,
      marginx: settings.marginX,
      marginy: settings.marginY,
      edgesep: settings.edgePadding,
      ranksep: settings.rankPadding,
      nodesep: settings.nodePadding,
      align: settings.align,
      acyclicer: settings.acyclicer,
      ranker: settings.ranker,
      multigraph: settings.multigraph,
      compound: settings.compound
    });

    // Default to assigning a new object as a label for each new edge.
    this.dagreGraph.setDefaultEdgeLabel(() => {
      return {
        /* empty */
      };
    });

    this.dagreNodes = graph.nodes.map(n => {
      const node: any = Object.assign({}, n);
      if (n.dimension && n.position) {
        node.width = n.dimension.width;
        node.height = n.dimension.height;
        node.x = n.position.x;
        node.y = n.position.y;
      }
      return node;
    });

    this.dagreClusters = graph.clusters || [];

    this.dagreEdges = graph.edges.map(l => {
      let linkId = 1;
      const newLink: any = Object.assign({}, l);
      if (!newLink.id) {
        newLink.id = linkId;
        linkId++;
      }
      return newLink;
    });

    for (const node of this.dagreNodes) {
      if (!node.width) {
        node.width = 20;
      }
      if (!node.height) {
        node.height = 30;
      }

      // update dagre
      this.dagreGraph.setNode(node.id, node);
    }

    for (const cluster of this.dagreClusters) {
      this.dagreGraph.setNode(cluster.id, cluster);
      if (cluster.childNodeIds != null) {
        cluster.childNodeIds.forEach(childNodeId => {
          this.dagreGraph.setParent(childNodeId, cluster.id);
        });
      }
    }


    // update dagre
    for (const edge of this.dagreEdges) {
      if (settings.multigraph) {
        this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
      } else {
        this.dagreGraph.setEdge(edge.source, edge.target);
      }
    }

    return this.dagreGraph;
  }
}
