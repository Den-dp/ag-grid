// Type definitions for @ag-grid-community/core v30.0.1
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { BeanStub } from "../../context/beanStub";
import { ColDef, ColGroupDef } from "../../entities/colDef";
import { GridOptions } from "../../entities/gridOptions";
import { ToolPanelDef } from "../../interfaces/iSideBar";
import { IFloatingFilterParams } from "../../filter/floating/floatingFilter";
import { IHeaderParams } from "../../headerRendering/cells/column/headerComp";
import { IHeaderGroupParams } from "../../headerRendering/cells/columnGroup/headerGroupComp";
import { ICellEditorParams } from "../../interfaces/iCellEditor";
import { IFilterDef, IFilterParams } from "../../interfaces/iFilter";
import { IRichCellEditorParams } from "../../interfaces/iRichCellEditorParams";
import { SetFilterParams } from "../../interfaces/iSetFilter";
import { IStatusPanelParams, StatusPanelDef } from "../../interfaces/iStatusPanel";
import { IToolPanelParams } from "../../interfaces/iToolPanel";
import { GroupCellRendererParams } from "../../rendering/cellRenderers/groupCellRendererCtrl";
import { ICellRendererParams, ISetFilterCellRendererParams } from "../../rendering/cellRenderers/iCellRenderer";
import { IDateParams } from "../../rendering/dateComponent";
import { ILoadingOverlayParams } from "../../rendering/overlays/loadingOverlayComponent";
import { INoRowsOverlayParams } from "../../rendering/overlays/noRowsOverlayComponent";
import { ITooltipParams } from "../../rendering/tooltipComponent";
import { AgPromise } from "../../utils";
import { ComponentType } from "./componentTypes";
import { WithoutGridCommon } from "../../interfaces/iCommon";
export declare type DefinitionObject = GridOptions | ColDef | ColGroupDef | IFilterDef | SetFilterParams | IRichCellEditorParams | ToolPanelDef | StatusPanelDef;
export interface UserCompDetails {
    componentClass: any;
    componentFromFramework: boolean;
    params: any;
    type: ComponentType;
    popupFromSelector?: boolean;
    popupPositionFromSelector?: 'over' | 'under';
    newAgStackInstance: () => AgPromise<any>;
}
export declare class UserComponentFactory extends BeanStub {
    private readonly gridOptions;
    private readonly agComponentUtils;
    private readonly componentMetadataProvider;
    private readonly userComponentRegistry;
    private readonly frameworkComponentWrapper;
    getHeaderCompDetails(colDef: ColDef, params: WithoutGridCommon<IHeaderParams>): UserCompDetails | undefined;
    getHeaderGroupCompDetails(params: WithoutGridCommon<IHeaderGroupParams>): UserCompDetails | undefined;
    getFullWidthCellRendererDetails(params: WithoutGridCommon<ICellRendererParams>): UserCompDetails;
    getFullWidthLoadingCellRendererDetails(params: WithoutGridCommon<ICellRendererParams>): UserCompDetails;
    getFullWidthGroupCellRendererDetails(params: WithoutGridCommon<ICellRendererParams>): UserCompDetails;
    getFullWidthDetailCellRendererDetails(params: WithoutGridCommon<ICellRendererParams>): UserCompDetails;
    getInnerRendererDetails(def: GroupCellRendererParams, params: WithoutGridCommon<ICellRendererParams>): UserCompDetails | undefined;
    getFullWidthGroupRowInnerCellRenderer(def: any, params: WithoutGridCommon<ICellRendererParams>): UserCompDetails | undefined;
    getCellRendererDetails(def: ColDef | IRichCellEditorParams, params: WithoutGridCommon<ICellRendererParams>): UserCompDetails | undefined;
    getCellEditorDetails(def: ColDef, params: WithoutGridCommon<ICellEditorParams>): UserCompDetails | undefined;
    getFilterDetails(def: IFilterDef, params: WithoutGridCommon<IFilterParams>, defaultFilter: string): UserCompDetails | undefined;
    getDateCompDetails(params: WithoutGridCommon<IDateParams>): UserCompDetails;
    getLoadingOverlayCompDetails(params: WithoutGridCommon<ILoadingOverlayParams>): UserCompDetails;
    getNoRowsOverlayCompDetails(params: WithoutGridCommon<INoRowsOverlayParams>): UserCompDetails;
    getTooltipCompDetails(params: WithoutGridCommon<ITooltipParams>): UserCompDetails;
    getSetFilterCellRendererDetails<TData, V>(def: SetFilterParams<TData, V>, params: WithoutGridCommon<ISetFilterCellRendererParams>): UserCompDetails | undefined;
    getFloatingFilterCompDetails(def: IFilterDef, params: WithoutGridCommon<IFloatingFilterParams<any>>, defaultFloatingFilter: string | null): UserCompDetails | undefined;
    getToolPanelCompDetails(toolPanelDef: ToolPanelDef, params: WithoutGridCommon<IToolPanelParams>): UserCompDetails;
    getStatusPanelCompDetails(def: StatusPanelDef, params: WithoutGridCommon<IStatusPanelParams>): UserCompDetails;
    private getCompDetails;
    private getCompKeys;
    private newAgStackInstance;
    mergeParamsWithApplicationProvidedParams(defObject: DefinitionObject, type: ComponentType, paramsFromGrid: any, paramsFromSelector?: any): any;
    private initComponent;
    getDefaultFloatingFilterType(def: IFilterDef, getFromDefault: () => string): string | null;
}
