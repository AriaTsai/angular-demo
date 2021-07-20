import { ClusterNode, Edge, Node } from '@swimlane/ngx-graph';
import { BoSvgCircleNode, BoSvgLink, BoSvgNode } from './svg-tree-config-builder';


// =====  tree  =====
export const edgeData: Edge[] = [
  {
    id: 'a',
    source: '1',
    target: '2',
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
  },
  {
    id: 'g',
    source: '6',
    target: '7'
  },
  {
    id: 'h',
    source: '6',
    target: '8'
  },
  {
    id: 'i',
    source: '2',
    target: '9'
  },
  {
    id: 'j',
    source: '2',
    target: '10'
  },
  {
    id: 'k',
    source: '2',
    target: '11'
  },
  {
    id: 'l',
    source: '2',
    target: '12'
  },
  {
    id: 'm',
    source: '7',
    target: '13'
  },
  {
    id: 'n',
    source: '7',
    target: '14'
  },
  {
    id: 'v',
    source: '14',
    target: '15'
  },
  {
    id: 'p',
    source: '14',
    target: '16'
  },
  {
    id: 'z',
    source: '14',
    target: '17'
  },
];

export const nodeData: BoSvgNode[] = [
  {
    id: '1',
    label: '管理組管理組管理組管理管理組管理組管理組管理',
  },
  {
    id: '2',
    label: 'qqqqqqqqqqqqqqqqqqqqqqq',
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
  },
  {
    id: '7',
    label: 'Node G'
  },
  {
    id: '8',
    label: 'Node H'
  },
  {
    id: '9',
    label: 'Node H'
  },
  {
    id: '10',
    label: 'Node H'
  },
  {
    id: '11',
    label: 'Node H'
  },
  {
    id: '12',
    label: 'Node H'
  },
  {
    id: '13',
    label: 'Node T'
  },
  {
    id: '14',
    label: 'Node T'
  },
  {
    id: '15',
    label: 'Node Q'
  },
  {
    id: '16',
    label: 'Node S'
  },
  {
    id: '17',
    label: 'Node S'
  },
];

export const clustersData: ClusterNode[] = [
  {
    id: 'cluster0',
    label: '第一層',
    childNodeIds: ['1'],
    data: { clustersType: 'line', strokeColor: 'rgba(0,0,0,0.3)' }
  },
  {
    id: 'cluster2',
    label: '第二層',
    childNodeIds: ['2', '3'],
    data: { clustersType: 'line', strokeColor: 'rgba(0,0,0,0.3)'  }
  },
  {
    id: 'cluster3',
    label: '第三層',
    childNodeIds: ['4', '5', '6', '9', '10', '11', '12'],
    data: { clustersType: 'line', strokeColor: 'rgba(0,0,0,0.3)'  }
  },
  {
    id: 'cluster4',
    label: '第四層',
    childNodeIds: ['7', '8'],
    data: { clustersType: 'line', strokeColor: 'rgba(0,0,0,0.3)'  }
  },
  {
    id: 'cluster5',
    label: '第五層',
    childNodeIds: ['13', '14'],
    data: { clustersType: 'line', strokeColor: 'rgba(0,0,0,0.3)'  }
  },
  {
    id: 'cluster6',
    label: '第六層',
    childNodeIds: ['15', '16', '17'],
    data: { clustersType: 'line', strokeColor: 'rgba(0,0,0,0.3)'  }
  },
  {
    id: 'cluster7',
    label: 'Group 3',
    childNodeIds: ['3', '4', '5'],
    data: {
      clustersType: 'group',
      backgoundColor: '#ebf9ff',
      target: '3'
    }
  },
];



// =====  sign  =====
export const signLinksData: BoSvgLink[] = [
  {
    id: 'aa',
    source: '11',
    target: '22',
  },
  {
    id: 'bb',
    source: '11',
    target: '33'
  },
  {
    id: 'cc',
    source: '22',
    target: '44'
  },
  {
    id: 'dd',
    source: '33',
    target: '44'
  },
];


export const signNodesData = [
  {
    id: '11',
    label: 'Step 1',
  },
  {
    id: '22',
    label: 'Step 2-1',
  },
  {
    id: '33',
    label: 'Step 2-2'
  },
  {
    id: '44',
    label: 'Step 3'
  },

];

export const signClustersData: ClusterNode[] = [
  // {
  //   id: 'cluster0',
  //   label: '第一層',
  //   childNodeIds: ['33', '22'],
  //   data: { clustersType: 'line', strokeColor: 'rgba(0,0,0,0.3)' }
  // },
];
