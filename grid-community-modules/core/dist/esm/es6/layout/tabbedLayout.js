/**
 * @ag-grid-community/core - Advanced Data Grid / Data Table supporting Javascript / Typescript / React / Angular / Vue
 * @version v30.0.0
 * @link https://www.ag-grid.com/
 * @license MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RefSelector } from '../widgets/componentAnnotations';
import { ManagedFocusFeature } from '../widgets/managedFocusFeature';
import { clearElement } from '../utils/dom';
import { setAriaLabel, setAriaRole } from '../utils/aria';
import { callIfPresent } from '../utils/function';
import { KeyCode } from '../constants/keyCode';
import { Component } from '../widgets/component';
import { PostConstruct, Autowired } from '../context/context';
export class TabbedLayout extends Component {
    constructor(params) {
        super(TabbedLayout.getTemplate(params.cssClass));
        this.items = [];
        this.tabbedItemScrollMap = new Map();
        this.params = params;
        if (params.items) {
            params.items.forEach(item => this.addItem(item));
        }
    }
    postConstruct() {
        this.createManagedBean(new ManagedFocusFeature(this.getFocusableElement(), {
            onTabKeyDown: this.onTabKeyDown.bind(this),
            handleKeyDown: this.handleKeyDown.bind(this)
        }));
        this.addDestroyFunc(() => { var _a, _b, _c; return (_c = (_b = (_a = this.activeItem) === null || _a === void 0 ? void 0 : _a.tabbedItem) === null || _b === void 0 ? void 0 : _b.afterDetachedCallback) === null || _c === void 0 ? void 0 : _c.call(_b); });
    }
    static getTemplate(cssClass) {
        return /* html */ `<div class="ag-tabs ${cssClass}">
            <div ref="eHeader" role="tablist" class="ag-tabs-header ${cssClass ? `${cssClass}-header` : ''}"></div>
            <div ref="eBody" role="presentation" class="ag-tabs-body ${cssClass ? `${cssClass}-body` : ''}"></div>
        </div>`;
    }
    handleKeyDown(e) {
        const eDocument = this.gridOptionsService.getDocument();
        switch (e.key) {
            case KeyCode.RIGHT:
            case KeyCode.LEFT:
                if (!this.eHeader.contains(eDocument.activeElement)) {
                    return;
                }
                const isRightKey = e.key === KeyCode.RIGHT;
                const isRtl = this.gridOptionsService.is('enableRtl');
                const currentPosition = this.items.indexOf(this.activeItem);
                const nextPosition = isRightKey !== isRtl ? Math.min(currentPosition + 1, this.items.length - 1) : Math.max(currentPosition - 1, 0);
                if (currentPosition === nextPosition) {
                    return;
                }
                e.preventDefault();
                const nextItem = this.items[nextPosition];
                this.showItemWrapper(nextItem);
                nextItem.eHeaderButton.focus();
                break;
            case KeyCode.UP:
            case KeyCode.DOWN:
                e.stopPropagation();
                break;
        }
    }
    onTabKeyDown(e) {
        if (e.defaultPrevented) {
            return;
        }
        const { focusService, eHeader, eBody, activeItem } = this;
        const eDocument = this.gridOptionsService.getDocument();
        const activeElement = eDocument.activeElement;
        const target = e.target;
        e.preventDefault();
        if (eHeader.contains(activeElement)) {
            // focus is in header, move into body of popup
            focusService.focusInto(eBody, e.shiftKey);
            return;
        }
        let nextEl = null;
        if (focusService.isTargetUnderManagedComponent(eBody, target)) {
            if (e.shiftKey) {
                nextEl = this.focusService.findFocusableElementBeforeTabGuard(eBody, target);
            }
            if (!nextEl) {
                nextEl = activeItem.eHeaderButton;
            }
        }
        if (!nextEl && eBody.contains(activeElement)) {
            nextEl = focusService.findNextFocusableElement(eBody, false, e.shiftKey);
            if (!nextEl) {
                nextEl = activeItem.eHeaderButton;
            }
        }
        if (nextEl) {
            nextEl.focus();
        }
    }
    setAfterAttachedParams(params) {
        this.afterAttachedParams = params;
    }
    showFirstItem() {
        if (this.items.length > 0) {
            this.showItemWrapper(this.items[0]);
        }
    }
    addItem(item) {
        const eHeaderButton = document.createElement('span');
        setAriaRole(eHeaderButton, 'tab');
        eHeaderButton.setAttribute('tabIndex', '-1');
        eHeaderButton.appendChild(item.title);
        eHeaderButton.classList.add('ag-tab');
        this.eHeader.appendChild(eHeaderButton);
        setAriaLabel(eHeaderButton, item.titleLabel);
        const wrapper = {
            tabbedItem: item,
            eHeaderButton: eHeaderButton
        };
        this.items.push(wrapper);
        eHeaderButton.addEventListener('click', this.showItemWrapper.bind(this, wrapper));
    }
    showItem(tabbedItem) {
        const itemWrapper = this.items.find(wrapper => wrapper.tabbedItem === tabbedItem);
        if (itemWrapper) {
            this.showItemWrapper(itemWrapper);
        }
    }
    showItemWrapper(wrapper) {
        var _a, _b;
        const { tabbedItem, eHeaderButton } = wrapper;
        if (this.params.onItemClicked) {
            this.params.onItemClicked({ item: tabbedItem });
        }
        if (this.activeItem === wrapper) {
            callIfPresent(this.params.onActiveItemClicked);
            return;
        }
        if (this.lastScrollListener) {
            this.lastScrollListener = this.lastScrollListener();
        }
        clearElement(this.eBody);
        tabbedItem.bodyPromise.then((body) => {
            this.eBody.appendChild(body);
            const onlyUnmanaged = !this.focusService.isKeyboardMode();
            this.focusService.focusInto(this.eBody, false, onlyUnmanaged);
            if (tabbedItem.afterAttachedCallback) {
                tabbedItem.afterAttachedCallback(this.afterAttachedParams);
            }
            if (this.params.keepScrollPosition) {
                const scrollableContainer = (tabbedItem.getScrollableContainer && tabbedItem.getScrollableContainer()) || body;
                this.lastScrollListener = this.addManagedListener(scrollableContainer, 'scroll', () => {
                    this.tabbedItemScrollMap.set(tabbedItem.name, scrollableContainer.scrollTop);
                });
                const scrollPosition = this.tabbedItemScrollMap.get(tabbedItem.name);
                if (scrollPosition !== undefined) {
                    // Safari needs a small timeout or it will fire a scroll event to position 0
                    setTimeout(() => {
                        scrollableContainer.scrollTop = scrollPosition;
                    }, 0);
                }
            }
        });
        if (this.activeItem) {
            this.activeItem.eHeaderButton.classList.remove('ag-tab-selected');
            (_b = (_a = this.activeItem.tabbedItem).afterDetachedCallback) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        eHeaderButton.classList.add('ag-tab-selected');
        this.activeItem = wrapper;
    }
}
__decorate([
    Autowired('focusService')
], TabbedLayout.prototype, "focusService", void 0);
__decorate([
    RefSelector('eHeader')
], TabbedLayout.prototype, "eHeader", void 0);
__decorate([
    RefSelector('eBody')
], TabbedLayout.prototype, "eBody", void 0);
__decorate([
    PostConstruct
], TabbedLayout.prototype, "postConstruct", null);
