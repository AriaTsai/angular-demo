import { Edge } from '@swimlane/ngx-graph';

export enum ArrowType {
    start = 1,
    end = 2,
    both = 3
}

export class BoLinkStyle {
    linkWidth: number;
    arrowType: ArrowType;
    constructor() {
        this.linkWidth = 1;
        this.arrowType = ArrowType.end;
    }
}

export class BoSvgLink implements Edge {
    id?: string;
    source: string;
    target: string;
    data?: BoLinkStyle;

    constructor() {
        this.data = new BoLinkStyle();
    }
}


export class BoSvgLinkBuilder {
    private link: BoSvgLink;

    constructor() {
        this.link = new BoSvgLink();
    }

    setLinkId(id: string): BoSvgLinkBuilder {
        this.link.id = id;
        return this;
    }

    setSource(source: string): BoSvgLinkBuilder {
        this.link.source = source;
        return this;
    }

    setTarget(target: string): BoSvgLinkBuilder {
        this.link.target = target;
        return this;
    }

    setArrowType(type: ArrowType): BoSvgLinkBuilder {
        this.link.data.arrowType = type;
        return this;
    }

    setLinkWidth(width: number): BoSvgLinkBuilder {
        this.link.data.linkWidth = width;
        return this;
    }

    build(): BoSvgLink {
        return this.link;
    }

}
