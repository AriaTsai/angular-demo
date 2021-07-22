import { BoSvgNode, NodeStyle } from '@shared/bo-svg-tree/bo-svg-tree-config-builder';
import { NodeDimension } from '@swimlane/ngx-graph';

export class NodeRectStyle implements NodeStyle {
    readonly shape = 'rect';
    fillColor = '#ffffff';
    borderColor = '#000000';
    borderWidth = 0;
    borderRadious = 3;
    padding = 0;
}

export class BoSvgNodeRect extends BoSvgNode {
    readonly id: string;
    data?: NodeRectStyle;
    _dimension: NodeDimension;
    _width: number;
    _height: number;

    constructor(id: string, label?: string) {
        super();
        this.id = id;
        this.label = label||'';
        this.data = new NodeRectStyle();
        this._dimension = { width: 100, height: 100 };
        this._width = 100;
        this._height = 100;
    }

    get dimension(): NodeDimension{
        return this._dimension;
    }

    set dimension(value) {
        this._dimension.width = this.width + this.data.borderWidth + this.data.padding*2;
        this._dimension.height = this.height + this.data.borderWidth + this.data.padding*2;
    }

    get width() {    // width+border (不含padding)
        return this._width - this.data.borderWidth;
    }

    get height() {  // height+border (不含padding)
        return this._height - this.data.borderWidth;
    }

    get rectX(): number {
        return this.data.padding + this.data.borderWidth/2;
    }

    get rectY(): number {
        return this.data.padding + this.data.borderWidth/2;
    }
}


export class BoSvgNodeRectBuilder {
    protected node: BoSvgNodeRect;

    constructor(id: string, label?: string) {
        this.node = new BoSvgNodeRect(id, label);
    }

    setWidth(width: number): BoSvgNodeRectBuilder {
        this.node._width = width;
        this.node.dimension.width = width;
        return this;
    }

    setHeight(height: number): BoSvgNodeRectBuilder {
        this.node._height = height;
        this.node.dimension.height = height;
        return this;
    }

    setColor(color: string): BoSvgNodeRectBuilder {
        this.node.data.fillColor = color;
        return this;
    }

    setBorderColor(color: string): BoSvgNodeRectBuilder {
        this.node.data.borderColor = color;
        return this;
    }

    setBorderWidth(value: number): BoSvgNodeRectBuilder {
        this.node.data.borderWidth = value;
        return this;
    }

    setPadding(value: number): BoSvgNodeRectBuilder {
        this.node.data.padding = value;
        return this;
    }

    setBorderRadious(value: number): BoSvgNodeRectBuilder {
        this.node.data.borderRadious = value;
        return this;
    }

    public build(): any {
        return this.node;
    }

}
