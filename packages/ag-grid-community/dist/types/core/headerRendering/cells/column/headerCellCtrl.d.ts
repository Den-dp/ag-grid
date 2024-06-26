import type { UserCompDetails } from '../../../components/framework/userComponentFactory';
import { HorizontalDirection } from '../../../constants/direction';
import type { BeanCollection } from '../../../context/context';
import type { AgColumn } from '../../../entities/agColumn';
import type { ColumnSortState } from '../../../utils/aria';
import type { HeaderRowCtrl } from '../../row/headerRowCtrl';
import type { IAbstractHeaderCellComp } from '../abstractCell/abstractHeaderCellCtrl';
import { AbstractHeaderCellCtrl } from '../abstractCell/abstractHeaderCellCtrl';
import type { IHeader, IHeaderParams } from './headerComp';
import { ResizeFeature } from './resizeFeature';
export interface IHeaderCellComp extends IAbstractHeaderCellComp {
    setWidth(width: string): void;
    setAriaSort(sort?: ColumnSortState): void;
    setUserCompDetails(compDetails: UserCompDetails): void;
    getUserCompInstance(): IHeader | undefined;
}
type HeaderAriaDescriptionKey = 'filter' | 'menu' | 'sort' | 'selectAll' | 'filterButton';
export declare class HeaderCellCtrl extends AbstractHeaderCellCtrl<IHeaderCellComp, AgColumn, ResizeFeature> {
    private refreshFunctions;
    private selectAllFeature;
    private sortable;
    private displayName;
    private draggable;
    private menuEnabled;
    private openFilterEnabled;
    private dragSourceElement;
    private userCompDetails;
    private userHeaderClasses;
    private ariaDescriptionProperties;
    private tooltipFeature;
    constructor(column: AgColumn, beans: BeanCollection, parentRowCtrl: HeaderRowCtrl);
    setComp(comp: IHeaderCellComp, eGui: HTMLElement, eResize: HTMLElement, eHeaderCompWrapper: HTMLElement): void;
    protected resizeHeader(delta: number, shiftKey: boolean): void;
    protected moveHeader(hDirection: HorizontalDirection): void;
    private setupUserComp;
    private setCompDetails;
    private lookupUserCompDetails;
    private createParams;
    private setupSelectAll;
    getSelectAllGui(): HTMLElement;
    protected handleKeyDown(e: KeyboardEvent): void;
    private onEnterKeyDown;
    private showMenuOnKeyPress;
    private onFocusIn;
    private onFocusOut;
    private setupTooltip;
    private setupClassesFromColDef;
    setDragSource(eSource: HTMLElement | undefined): void;
    private createDragItem;
    private updateState;
    addRefreshFunction(func: () => void): void;
    private refresh;
    private refreshHeaderComp;
    attemptHeaderCompRefresh(params: IHeaderParams): boolean;
    private calculateDisplayName;
    private checkDisplayName;
    private workOutDraggable;
    private onColumnRowGroupChanged;
    private onColumnPivotChanged;
    private onColumnValueChanged;
    private setupWidth;
    private setupMovingCss;
    private setupMenuClass;
    private setupSortableClass;
    private setupFilterClass;
    private setupWrapTextClass;
    protected onDisplayedColumnsChanged(): void;
    private onHeaderHeightChanged;
    private refreshSpanHeaderHeight;
    private setupAutoHeight;
    private refreshAriaSort;
    private refreshAriaMenu;
    private refreshAriaFilterButton;
    private refreshAriaFiltered;
    setAriaDescriptionProperty(property: HeaderAriaDescriptionKey, value: string | null): void;
    announceAriaDescription(): void;
    private refreshAria;
    private addColumnHoverListener;
    getColId(): string;
    private addActiveHeaderMouseListeners;
    private handleMouseOverChange;
    private setActiveHeader;
    getAnchorElementForMenu(isFilter?: boolean): HTMLElement;
    destroy(): void;
}
export {};
