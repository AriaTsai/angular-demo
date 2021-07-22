import { ElementRef } from '@angular/core';
import { BoSvgNode, NodeStyle } from '@shared/bo-svg-tree/bo-svg-tree-config-builder';
import { NodeDimension } from '@swimlane/ngx-graph';


export class NodeCustomStyle implements NodeStyle {
    readonly shape = 'customNode';
    template?: ElementRef<any>;
}

export class BoSvgNodeCustom extends BoSvgNode {
    readonly id: string;
    data?: NodeCustomStyle;
    dimension?: NodeDimension;

    constructor(id: string, label?: string) {
        super();
        this.id = id;
        this.label = label||'';
        this.data = new NodeCustomStyle();
        this.dimension = { width:100, height:100 };
    }
}

export class BoSvgNodeCustomBuilder {
    protected node: BoSvgNodeCustom;

    constructor(id: string, label?: string) {
        this.node = new BoSvgNodeCustom(id, label);
    }

    //  custom node 的 長寬依照 template 客制所以無法確認內容是怎樣，因此只允許設定該點的大小，
    //  padding、position的設定， 由template 自己決定

    setWidth(width: number): BoSvgNodeCustomBuilder {
        //若無設定長寬，dimension中沒有正確長寬位置會錯誤
        this.node.dimension.width = width;
        return this;
    }

    setHeight(height: number): BoSvgNodeCustomBuilder {
        //若無設定長寬，dimension中沒有正確長寬位置會錯誤
        this.node.dimension.height = height;
        return this;
    }

    setNodeTemplate(template: ElementRef<any>): BoSvgNodeCustomBuilder {
        this.node.data.template = template;
        return this;
    }

    build(): BoSvgNodeCustom {
        return this.node;
    }
}
