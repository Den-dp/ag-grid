import { BeanStub } from '../context/beanStub';
import type { BeanCollection } from '../context/context';
import type { WithoutGridCommon } from '../interfaces/iCommon';
import type { ITooltipParams } from '../rendering/tooltipComponent';
export interface TooltipParentComp {
    getTooltipParams(): WithoutGridCommon<ITooltipParams>;
    getGui(): HTMLElement;
}
export declare class TooltipStateManager extends BeanStub {
    private parentComp;
    private tooltipShowDelayOverride?;
    private tooltipHideDelayOverride?;
    private shouldDisplayTooltip?;
    private popupService;
    private userComponentFactory;
    wireBeans(beans: BeanCollection): void;
    private static lastTooltipHideTime;
    private static isLocked;
    private showTooltipTimeoutId;
    private hideTooltipTimeoutId;
    private interactiveTooltipTimeoutId;
    private interactionEnabled;
    private isInteractingWithTooltip;
    private state;
    private lastMouseEvent;
    private tooltipComp;
    private tooltipPopupDestroyFunc;
    private tooltipInstanceCount;
    private tooltipMouseTrack;
    private tooltipTrigger;
    private tooltipMouseEnterListener;
    private tooltipMouseLeaveListener;
    private tooltipFocusInListener;
    private tooltipFocusOutListener;
    private onBodyScrollEventCallback;
    private onColumnMovedEventCallback;
    constructor(parentComp: TooltipParentComp, tooltipShowDelayOverride?: number | undefined, tooltipHideDelayOverride?: number | undefined, shouldDisplayTooltip?: (() => boolean) | undefined);
    postConstruct(): void;
    private getGridOptionsTooltipDelay;
    private getTooltipDelay;
    destroy(): void;
    private getTooltipTrigger;
    onMouseEnter(e: MouseEvent): void;
    private onMouseMove;
    private onMouseDown;
    private onMouseLeave;
    private onFocusIn;
    private onFocusOut;
    private onKeyDown;
    private prepareToShowTooltip;
    private isLastTooltipHiddenRecently;
    private setToDoNothing;
    private showTooltip;
    hideTooltip(forceHide?: boolean): void;
    private newTooltipComponentCallback;
    private onTooltipMouseEnter;
    private onTooltipMouseLeave;
    private onTooltipFocusIn;
    private onTooltipFocusOut;
    private positionTooltip;
    private destroyTooltipComp;
    private clearTooltipListeners;
    private lockService;
    private unlockService;
    private startHideTimeout;
    private clearShowTimeout;
    private clearHideTimeout;
    private clearInteractiveTimeout;
    private clearTimeouts;
}
