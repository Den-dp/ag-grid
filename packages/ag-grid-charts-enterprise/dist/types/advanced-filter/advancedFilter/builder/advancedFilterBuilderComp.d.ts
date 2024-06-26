import type { BeanCollection } from 'ag-grid-community';
import { Component } from 'ag-grid-community';
import type { VirtualListDragItem } from 'ag-grid-charts-enterprise';
import { AdvancedFilterBuilderItemComp } from './advancedFilterBuilderItemComp';
import type { AdvancedFilterBuilderEvents, AdvancedFilterBuilderItem } from './iAdvancedFilterBuilder';
export declare class AdvancedFilterBuilderComp extends Component<AdvancedFilterBuilderEvents> {
    private filterManager?;
    private advancedFilterService;
    private advancedFilterExpressionService;
    wireBeans(beans: BeanCollection): void;
    private readonly eList;
    private readonly eApplyFilterButton;
    private readonly eCancelFilterButton;
    private virtualList;
    private filterModel;
    private stringifiedModel;
    private items;
    private dragFeature;
    private showMove;
    private validationTooltipFeature;
    private validationMessage;
    constructor();
    postConstruct(): void;
    refresh(): void;
    getNumItems(): number;
    moveItem(item: AdvancedFilterBuilderItem | null, destination: VirtualListDragItem<AdvancedFilterBuilderItemComp> | null): void;
    afterGuiAttached(): void;
    private setupVirtualList;
    private setupButtons;
    private removeItemFromParent;
    private moveItemToIndex;
    private isChildOrSelf;
    private setupFilterModel;
    private formatFilterModel;
    private buildList;
    private refreshList;
    private updateItemComponent;
    private createItemComponent;
    private addItem;
    private removeItem;
    private moveItemUpDown;
    private canMoveDown;
    private close;
    private validate;
    private validateItems;
}
