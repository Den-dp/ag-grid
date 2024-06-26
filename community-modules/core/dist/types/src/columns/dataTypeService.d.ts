import type { NamedBean } from '../context/bean';
import { BeanStub } from '../context/beanStub';
import type { BeanCollection } from '../context/context';
import type { AgColumn } from '../entities/agColumn';
import type { ColDef } from '../entities/colDef';
import type { BaseCellDataType, CoreDataTypeDefinition, DataTypeDefinition } from '../entities/dataType';
import type { Column } from '../interfaces/iColumn';
import type { IRowNode } from '../interfaces/iRowNode';
type FormatValueFunc = (params: {
    column: Column;
    node: IRowNode | null;
    value: any;
}) => string;
export declare class DataTypeService extends BeanStub implements NamedBean {
    beanName: "dataTypeService";
    private rowModel;
    private columnModel;
    private funcColsService;
    private valueService;
    private columnApplyStateService;
    wireBeans(beans: BeanCollection): void;
    private dataTypeDefinitions;
    private dataTypeMatchers;
    private formatValueFuncs;
    private isWaitingForRowData;
    private hasObjectValueParser;
    private hasObjectValueFormatter;
    private groupHideOpenParents;
    private initialData;
    private isColumnTypeOverrideInDataTypeDefinitions;
    private columnStateUpdatesPendingInference;
    private columnStateUpdateListenerDestroyFuncs;
    postConstruct(): void;
    private processDataTypeDefinitions;
    private mergeDataTypeDefinitions;
    private processDataTypeDefinition;
    private validateDataTypeDefinition;
    private createGroupSafeValueFormatter;
    updateColDefAndGetColumnType(colDef: ColDef, userColDef: ColDef, colId: string): string | string[] | undefined;
    addColumnListeners(column: AgColumn): void;
    private canInferCellDataType;
    private doColDefPropsPreventInference;
    private doesColDefPropPreventInference;
    private inferCellDataType;
    private getInitialData;
    private initWaitForRowData;
    isPendingInference(): boolean;
    private processColumnsPendingInference;
    private getUpdatedColumnState;
    private checkObjectValueHandlers;
    private getDateStringTypeDefinition;
    getDateParserFunction(column?: AgColumn | null): (value: string | undefined) => Date | undefined;
    getDateFormatterFunction(column?: AgColumn | null): (value: Date | undefined) => string | undefined;
    getDataTypeDefinition(column: AgColumn): DataTypeDefinition | CoreDataTypeDefinition | undefined;
    getBaseDataType(column: AgColumn): BaseCellDataType | undefined;
    checkType(column: AgColumn, value: any): boolean;
    validateColDef(colDef: ColDef): void;
    getFormatValue(cellDataType: string): FormatValueFunc | undefined;
    private setColDefPropertiesForBaseDataType;
    private getDefaultDataTypes;
    private destroyColumnStateUpdateListeners;
    destroy(): void;
}
export {};
