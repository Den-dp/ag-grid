// Type definitions for @ag-grid-community/core v30.0.5
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { BeanStub } from "../context/beanStub";
export declare class ResizeObserverService extends BeanStub {
    private polyfillFunctions;
    private polyfillScheduled;
    observeResize(element: HTMLElement, callback: () => void): () => void;
    private doNextPolyfillTurn;
    private schedulePolyfill;
}
