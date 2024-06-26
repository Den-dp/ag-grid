import { Component } from '../../widgets/component';
import type { HeaderRowCtrl } from './headerRowCtrl';
export declare enum HeaderRowType {
    COLUMN_GROUP = "group",
    COLUMN = "column",
    FLOATING_FILTER = "filter"
}
export declare class HeaderRowComp extends Component {
    private ctrl;
    private headerComps;
    constructor(ctrl: HeaderRowCtrl);
    postConstruct(): void;
    destroy(): void;
    private setHeaderCtrls;
    private createHeaderComp;
}
