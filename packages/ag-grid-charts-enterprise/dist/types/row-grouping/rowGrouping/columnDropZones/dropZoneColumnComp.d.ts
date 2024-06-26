import type { AgColumn, BeanCollection, DragAndDropIcon, DragItem, DropTarget } from 'ag-grid-community';
import { DragSourceType } from 'ag-grid-community';
import { PillDragComp } from 'ag-grid-charts-enterprise';
import type { TDropZone } from './baseDropZonePanel';
export declare class DropZoneColumnComp extends PillDragComp<AgColumn> {
    private column;
    private dropZonePurpose;
    private popupService;
    private sortController;
    private columnModel;
    private columnNameService;
    private funcColsService;
    private aggFuncService?;
    wireBeans(beans: BeanCollection): void;
    private readonly eSortIndicator;
    private displayName;
    private popupShowing;
    constructor(column: AgColumn, dragSourceDropTarget: DropTarget, ghost: boolean, dropZonePurpose: TDropZone, horizontal: boolean);
    postConstruct(): void;
    getItem(): AgColumn;
    protected getDisplayName(): string;
    protected getTooltip(): string | null | undefined;
    protected addAdditionalAriaInstructions(ariaInstructions: string[], translate: (key: string, defaultValue: string) => string): void;
    protected isDraggable(): boolean;
    protected isRemovable(): boolean;
    private isReadOnly;
    protected getAriaDisplayName(): string;
    private getColumnAndAggFuncName;
    setupSort(): void;
    protected getDefaultIconName(): DragAndDropIcon;
    protected createGetDragItem(): () => DragItem;
    protected setupComponents(): void;
    protected onKeyDown(e: KeyboardEvent): void;
    protected getDisplayValue(): string;
    private onShowAggFuncSelection;
    private createAggSelect;
    private isGroupingAndLocked;
    private isAggregationZone;
    private isGroupingZone;
    protected getDragSourceType(): DragSourceType;
    destroy(): void;
}
