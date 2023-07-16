// Type definitions for @ag-grid-community/core v30.0.5
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Context } from "../context/context";
import { ColumnApi } from "../columns/columnApi";
import { ColumnModel } from "../columns/columnModel";
import { HeaderNavigationService } from "../headerRendering/common/headerNavigationService";
import { GridApi } from "../gridApi";
import { ExpressionService } from "../valueService/expressionService";
import { RowRenderer } from "./rowRenderer";
import { TemplateService } from "../templateService";
import { ValueService } from "../valueService/valueService";
import { EventService } from "../eventService";
import { ColumnAnimationService } from "./columnAnimationService";
import { IRangeService, ISelectionHandleFactory } from "../interfaces/IRangeService";
import { FocusService } from "../focusService";
import { IContextMenuFactory } from "../interfaces/iContextMenuFactory";
import { PopupService } from "../widgets/popupService";
import { ValueFormatterService } from "./valueFormatterService";
import { StylingService } from "../styling/stylingService";
import { ColumnHoverService } from "./columnHoverService";
import { PaginationProxy } from "../pagination/paginationProxy";
import { AnimationFrameService } from "../misc/animationFrameService";
import { UserComponentFactory } from "../components/framework/userComponentFactory";
import { DragService } from "../dragAndDrop/dragService";
import { DragAndDropService } from "../dragAndDrop/dragAndDropService";
import { SortController } from "../sortController";
import { FilterManager } from "../filter/filterManager";
import { RowContainerHeightService } from "./rowContainerHeightService";
import { IFrameworkOverrides } from "../interfaces/iFrameworkOverrides";
import { CellPositionUtils } from "../entities/cellPositionUtils";
import { RowPositionUtils } from "../entities/rowPositionUtils";
import { ISelectionService } from "../interfaces/iSelectionService";
import { RowCssClassCalculator } from "./row/rowCssClassCalculator";
import { IRowModel } from "../interfaces/iRowModel";
import { IClientSideRowModel } from "../interfaces/iClientSideRowModel";
import { IServerSideRowModel } from "../interfaces/iServerSideRowModel";
import { ResizeObserverService } from "../misc/resizeObserverService";
import { CtrlsService } from "../ctrlsService";
import { NavigationService } from "../gridBodyComp/navigationService";
import { AgStackComponentsRegistry } from "../components/agStackComponentsRegistry";
import { CtrlsFactory } from "../ctrlsFactory";
import { UserComponentRegistry } from "../components/framework/userComponentRegistry";
import { ValueCache } from "../valueService/valueCache";
import { RowNodeEventThrottle } from "../entities/rowNodeEventThrottle";
import { GridOptionsService } from "../gridOptionsService";
import { LocaleService } from "../localeService";
import { Environment } from "../environment";
import { ValueParserService } from "../valueService/valueParserService";
/** Using the IoC has a slight performance consideration, which is no problem most of the
 * time, unless we are trashing objects - which is the case when scrolling and rowComp
 * and cellComp. So for performance reasons, RowComp and CellComp do not get autowired
 * with the IoC. Instead they get passed this object which is all the beans the RowComp
 * and CellComp need. Not autowiring all the cells gives performance improvement. */
export declare class Beans {
    resizeObserverService: ResizeObserverService;
    paginationProxy: PaginationProxy;
    context: Context;
    columnApi: ColumnApi;
    gridApi: GridApi;
    gridOptionsService: GridOptionsService;
    expressionService: ExpressionService;
    environment: Environment;
    rowRenderer: RowRenderer;
    templateService: TemplateService;
    valueService: ValueService;
    eventService: EventService;
    columnModel: ColumnModel;
    headerNavigationService: HeaderNavigationService;
    navigationService: NavigationService;
    columnAnimationService: ColumnAnimationService;
    rangeService: IRangeService;
    focusService: FocusService;
    contextMenuFactory: IContextMenuFactory;
    popupService: PopupService;
    valueFormatterService: ValueFormatterService;
    stylingService: StylingService;
    columnHoverService: ColumnHoverService;
    userComponentFactory: UserComponentFactory;
    userComponentRegistry: UserComponentRegistry;
    animationFrameService: AnimationFrameService;
    dragService: DragService;
    dragAndDropService: DragAndDropService;
    sortController: SortController;
    filterManager: FilterManager;
    rowContainerHeightService: RowContainerHeightService;
    frameworkOverrides: IFrameworkOverrides;
    cellPositionUtils: CellPositionUtils;
    rowPositionUtils: RowPositionUtils;
    selectionService: ISelectionService;
    selectionHandleFactory: ISelectionHandleFactory;
    rowCssClassCalculator: RowCssClassCalculator;
    rowModel: IRowModel;
    ctrlsService: CtrlsService;
    ctrlsFactory: CtrlsFactory;
    agStackComponentsRegistry: AgStackComponentsRegistry;
    valueCache: ValueCache;
    rowNodeEventThrottle: RowNodeEventThrottle;
    localeService: LocaleService;
    valueParserService: ValueParserService;
    doingMasterDetail: boolean;
    clientSideRowModel: IClientSideRowModel;
    serverSideRowModel: IServerSideRowModel;
    private postConstruct;
}
