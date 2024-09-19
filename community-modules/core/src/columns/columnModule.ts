import type { _ColumnGridApi } from '../api/gridApi';
import { ColumnMoveService } from '../columnMove/columnMoveService';
import { ColumnResizeService } from '../columnResize/columnResizeService';
import { DragAndDropModule, HorizontalResizeModule } from '../dragAndDrop/dragModule';
import { _defineModule } from '../interfaces/iModule';
import { VERSION } from '../version';
import {
    applyColumnState,
    autoSizeAllColumns,
    autoSizeColumn,
    autoSizeColumns,
    getAllDisplayedColumnGroups,
    getAllDisplayedColumns,
    getAllDisplayedVirtualColumns,
    getAllGridColumns,
    getCenterDisplayedColumnGroups,
    getColumn,
    getColumnDef,
    getColumnDefs,
    getColumnGroup,
    getColumnGroupState,
    getColumnState,
    getColumns,
    getDisplayNameForColumn,
    getDisplayNameForColumnGroup,
    getDisplayedCenterColumns,
    getDisplayedColAfter,
    getDisplayedColBefore,
    getDisplayedLeftColumns,
    getDisplayedRightColumns,
    getLeftDisplayedColumnGroups,
    getProvidedColumnGroup,
    getRightDisplayedColumnGroups,
    isPinning,
    isPinningLeft,
    isPinningRight,
    moveColumn,
    moveColumnByIndex,
    moveColumns,
    resetColumnGroupState,
    resetColumnState,
    setColumnGroupOpened,
    setColumnGroupState,
    setColumnPinned,
    setColumnVisible,
    setColumnWidth,
    setColumnWidths,
    setColumnsPinned,
    setColumnsVisible,
    sizeColumnsToFit,
} from './columnApi';
import { ColumnAutosizeService } from './columnAutosizeService';
import { ControlsColService } from './controlsColService';
import { DataTypeService } from './dataTypeService';

export const DataTypeModule = _defineModule({
    version: VERSION,
    moduleName: '@ag-grid-community/data-type',
    beans: [DataTypeService],
});

export const ColumnMoveModule = _defineModule({
    version: VERSION,
    moduleName: '@ag-grid-community/column-move',
    beans: [ColumnMoveService],
    dependantModules: [DragAndDropModule],
});

export const ColumnAutosizeModule = _defineModule({
    version: VERSION,
    moduleName: '@ag-grid-community/column-autosize',
    beans: [ColumnAutosizeService],
});

export const ControlsColumnModule = _defineModule({
    version: VERSION,
    moduleName: '@ag-grid-community/controls-column',
    beans: [ControlsColService],
});

export const ColumnResizeModule = _defineModule({
    version: VERSION,
    moduleName: '@ag-grid-community/column-resize',
    beans: [ColumnResizeService],
    dependantModules: [HorizontalResizeModule],
});

export const ColumnApiModule = _defineModule<_ColumnGridApi<any>>({
    version: VERSION,
    moduleName: '@ag-grid-community/column-api',
    apiFunctions: {
        getColumnDef,
        getColumnDefs,
        sizeColumnsToFit,
        setColumnGroupOpened,
        getColumnGroup,
        getProvidedColumnGroup,
        getDisplayNameForColumn,
        getDisplayNameForColumnGroup,
        getColumn,
        getColumns,
        applyColumnState,
        getColumnState,
        resetColumnState,
        getColumnGroupState,
        setColumnGroupState,
        resetColumnGroupState,
        isPinning,
        isPinningLeft,
        isPinningRight,
        getDisplayedColAfter,
        getDisplayedColBefore,
        setColumnVisible,
        setColumnsVisible,
        setColumnPinned,
        setColumnsPinned,
        getAllGridColumns,
        getDisplayedLeftColumns,
        getDisplayedCenterColumns,
        getDisplayedRightColumns,
        getAllDisplayedColumns,
        getAllDisplayedVirtualColumns,
        moveColumn,
        moveColumnByIndex,
        moveColumns,
        setColumnWidth,
        setColumnWidths,
        getLeftDisplayedColumnGroups,
        getCenterDisplayedColumnGroups,
        getRightDisplayedColumnGroups,
        getAllDisplayedColumnGroups,
        autoSizeColumn,
        autoSizeColumns,
        autoSizeAllColumns,
    },
});
