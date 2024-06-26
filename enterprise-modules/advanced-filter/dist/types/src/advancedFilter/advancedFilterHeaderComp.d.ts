import type { BeanCollection } from '@ag-grid-community/core';
import { Component } from '@ag-grid-community/core';
export declare class AdvancedFilterHeaderComp extends Component {
    private enabled;
    private columnModel;
    private focusService;
    private headerNavigationService;
    wireBeans(beans: BeanCollection): void;
    private eAdvancedFilter;
    private height;
    constructor(enabled: boolean);
    postConstruct(): void;
    getFocusableElement(): HTMLElement;
    setEnabled(enabled: boolean): void;
    refresh(): void;
    getHeight(): number;
    setInputDisabled(disabled: boolean): void;
    private setupAdvancedFilter;
    private setEnabledHeight;
    private setAriaColumnCount;
    private setAriaRowIndex;
    private onGridColumnsChanged;
    private onKeyDown;
    private navigateUpDown;
    private navigateLeftRight;
    private hasFocus;
}
