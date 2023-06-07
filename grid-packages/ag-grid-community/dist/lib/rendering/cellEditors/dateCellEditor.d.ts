import { ICellEditorParams } from "../../interfaces/iCellEditor";
import { AgInputDateField } from "../../widgets/agInputDateField";
import { SimpleCellEditor } from "./simpleCellEditor";
export interface IDateCellEditorParams<TData = any, TContext = any> extends ICellEditorParams<TData, Date, TContext> {
    /** Min allowed value. Either `Date` object or string in format `'yyyy-mm-dd'`. */
    min?: string | Date;
    /** Max allowed value. Either `Date` object or string in format `'yyyy-mm-dd'`. */
    max?: string | Date;
    /** Granularity of the value when updating. Default: 'any'. */
    step?: number;
}
export declare class DateCellEditor extends SimpleCellEditor<Date, IDateCellEditorParams, AgInputDateField> {
    constructor();
}
