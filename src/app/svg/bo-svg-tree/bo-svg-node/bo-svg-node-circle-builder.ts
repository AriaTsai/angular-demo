import { BoSvgNode, NodeStyle } from '@shared/bo-svg-tree/bo-svg-tree-config-builder';
import { NodeDimension } from '@swimlane/ngx-graph';

export class NodeCircleStyle implements NodeStyle {
    readonly shape = 'circle';
    r = 50;
    fillColor = '#ffffff';
    borderColor = '#000000';
    borderWidth = 2;
    padding = 10;
}


export class BoSvgNodeCircle extends BoSvgNode {
    readonly id: string;
    data?: NodeCircleStyle;
    _dimension?: NodeDimension;

    constructor(id: string, label?: string,) {
        super();
        this.id = id;
        this.label = label||'';
        this.data = new NodeCircleStyle();
        this._dimension = { width: 120, height: 120 };
    }

    get dimension(): NodeDimension {
        return this._dimension;
    }
    set dimension(value) {
        this._dimension.width = (this.data.r + this.data.padding)*2;
        this._dimension.height = (this.data.r + this.data.padding)*2;
    }

    get cx(): number {
        return (this.data.r + this.data.padding);
    }
    get cy(): number {
        return (this.data.r + this.data.padding);
    }
}


export class BoSvgNodeCircleBuilder {
    protected node: BoSvgNodeCircle;

    constructor(id: string, label?: string) {
        this.node = new BoSvgNodeCircle(id, label);
    }

    setR(value: number): BoSvgNodeCircleBuilder {
        this.node.data.r = value;
        return this;
    }

    setColor(color: string): BoSvgNodeCircleBuilder {
        this.node.data.fillColor = color;
        return this;
    }

    setBorderColor(color: string): BoSvgNodeCircleBuilder {
        this.node.data.borderColor = color;
        return this;
    }

    setBorderWidth(value: number): BoSvgNodeCircleBuilder {
        this.node.data.borderWidth = value;
        return this;
    }

    setPadding(value: number): BoSvgNodeCircleBuilder {
        this.node.data.padding = value;
        return this;
    }

    public build(): any {
        return this.node;
    }
}
