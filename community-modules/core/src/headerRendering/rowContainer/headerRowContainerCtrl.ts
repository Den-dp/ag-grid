import { ColumnModel } from "../../columns/columnModel";
import { BeanStub } from "../../context/beanStub";
import { Autowired } from "../../context/context";
import { CtrlsService } from "../../ctrlsService";
import { Column, ColumnPinnedType } from "../../entities/column";
import { IHeaderColumn } from "../../interfaces/iHeaderColumn";
import { Events } from "../../eventKeys";
import { CenterWidthFeature } from "../../gridBodyComp/centerWidthFeature";
import { ScrollVisibleService } from "../../gridBodyComp/scrollVisibleService";
import { NumberSequence } from "../../utils";
import { HeaderRowType } from "../row/headerRowComp";
import { HeaderRowCtrl } from "../row/headerRowCtrl";
import { HeaderPosition } from "../common/headerPosition";
import { ColumnGroup } from "../../entities/columnGroup";
import { HeaderCellCtrl } from "../cells/column/headerCellCtrl";

export interface IHeaderRowContainerComp {
    setCenterWidth(width: string): void;
    setViewportScrollLeft(left: number): void;
    setPinnedContainerWidth(width: string): void;
    setDisplayed(displayed: boolean): void;
    setCtrls(ctrls: HeaderRowCtrl[]): void;
}

export class HeaderRowContainerCtrl extends BeanStub {

    @Autowired('ctrlsService') private ctrlsService: CtrlsService;
    @Autowired('columnModel') private columnModel: ColumnModel;

    private pinned: ColumnPinnedType;
    private comp: IHeaderRowContainerComp;
    private hidden: boolean = false;
    private includeFloatingFilter: boolean = false;

    private filtersRowCtrl: HeaderRowCtrl | undefined;
    private columnsRowCtrl: HeaderRowCtrl | undefined;
    private groupsRowCtrls: HeaderRowCtrl[] = [];
    private eViewport: HTMLElement;

    constructor(pinned: ColumnPinnedType) {
        super();
        this.pinned = pinned;
    }

    public setComp(comp: IHeaderRowContainerComp, eGui: HTMLElement): void {
        this.comp = comp;
        this.eViewport = eGui;

        this.setupCenterWidth();

        this.addManagedListener(this.eventService, Events.EVENT_GRID_COLUMNS_CHANGED, this.onGridColumnsChanged.bind(this));

        this.addManagedListener(this.eventService, Events.EVENT_DISPLAYED_COLUMNS_CHANGED, this.onDisplayedColumnsChanged.bind(this));

        this.addManagedListener(this.eventService, Events.EVENT_ADVANCED_FILTER_ENABLED_CHANGED, this.onDisplayedColumnsChanged.bind(this));

        this.ctrlsService.registerHeaderContainer(this, this.pinned);

        if (this.columnModel.isReady()) {
            this.refresh();
        }
    }

    public refresh(keepColumns = false): void {
        const sequence = new NumberSequence();
        const refreshColumns = () => {
            const rowIndex = sequence.next();

            const needNewInstance = !this.hidden && (this.columnsRowCtrl == null || !keepColumns || this.columnsRowCtrl.getRowIndex() !== rowIndex);
            const shouldDestroyInstance = needNewInstance || this.hidden;

            if (shouldDestroyInstance) {
                this.columnsRowCtrl = this.destroyBean(this.columnsRowCtrl);
            }

            if (needNewInstance) {
                this.columnsRowCtrl = this.createBean(new HeaderRowCtrl(rowIndex, this.pinned, HeaderRowType.COLUMN));
            }

        };



        refreshColumns();

        const allCtrls = this.getAllCtrls();
        this.comp.setCtrls(allCtrls);

    }
    private getAllCtrls(): HeaderRowCtrl[] {
        const res: HeaderRowCtrl[] = [...this.groupsRowCtrls];

        if (this.columnsRowCtrl) {
            res.push(this.columnsRowCtrl);
        }

        if (this.filtersRowCtrl) {
            res.push(this.filtersRowCtrl);
        }

        return res;
    }

    // grid cols have changed - this also means the number of rows in the header can have
    // changed. so we remove all the old rows and insert new ones for a complete refresh
    private onGridColumnsChanged() {
        this.refresh(true);
    }

    private onDisplayedColumnsChanged(): void {
    }

    private setupCenterWidth(): void {
        if (this.pinned != null) { return; }

        this.createManagedBean(new CenterWidthFeature(width => this.comp.setCenterWidth(`${width}px`), true));
    }

    public setHorizontalScroll(offset: number): void {
        this.comp.setViewportScrollLeft(offset);
    }

    public getHeaderCtrlForColumn(column: Column): HeaderCellCtrl | undefined;
    public getHeaderCtrlForColumn(column: any): any {
        if (column instanceof Column) {
            if (!this.columnsRowCtrl) { return; }
            return this.columnsRowCtrl.getHeaderCellCtrl(column);
        }

        if (this.groupsRowCtrls.length === 0) { return; }

        for (let i = 0; i < this.groupsRowCtrls.length; i++) {
            const ctrl = this.groupsRowCtrls[i].getHeaderCellCtrl(column);

            if (ctrl) { return ctrl; }
        }
    }

    /* tslint:disable */
    public getHtmlElementForColumnHeader(column: ColumnGroup): HTMLElement | null;
    public getHtmlElementForColumnHeader(column: Column): HTMLElement | null;
    public getHtmlElementForColumnHeader(column: any): any {
    /* tslint:enable */
        const cellCtrl = this.getHeaderCtrlForColumn(column);

        if (!cellCtrl) { return null; }

        return cellCtrl.getGui();
    }

    public getRowType(rowIndex: number): HeaderRowType | undefined {
        const allCtrls = this.getAllCtrls();
        const ctrl = allCtrls[rowIndex];
        return ctrl ? ctrl.getType() : undefined;
    }

    public focusHeader(rowIndex: number, column: IHeaderColumn, event?: KeyboardEvent): boolean {
        const allCtrls = this.getAllCtrls();
        const ctrl = allCtrls[rowIndex];
        if (!ctrl) { return false; }

        return ctrl.focusHeader(column, event);
    }

    public getViewport(): HTMLElement {
        return this.eViewport;
    }

    public getRowCount(): number {
        return this.groupsRowCtrls.length + (this.columnsRowCtrl ? 1 : 0) + (this.filtersRowCtrl ? 1 : 0);
    }

    protected destroy(): void {
        if (this.filtersRowCtrl) {
            this.filtersRowCtrl = this.destroyBean(this.filtersRowCtrl);
        }

        if (this.columnsRowCtrl) {
            this.columnsRowCtrl = this.destroyBean(this.columnsRowCtrl);
        }

        if (this.groupsRowCtrls && this.groupsRowCtrls.length) {
            this.groupsRowCtrls = this.destroyBeans(this.groupsRowCtrls);
        }

        super.destroy();
    }
}