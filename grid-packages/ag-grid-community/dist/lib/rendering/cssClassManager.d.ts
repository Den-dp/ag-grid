export declare class CssClassManager {
    private getGui;
    private cssClassStates;
    constructor(getGui: () => HTMLElement);
    addCssClass(className: string): void;
    removeCssClass(className: string): void;
    containsCssClass(className: string): boolean;
    addOrRemoveCssClass(className: string, addOrRemove: boolean): void;
}
