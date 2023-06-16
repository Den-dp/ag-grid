var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Autowired, Bean, BeanStub, Events, PostConstruct } from "@ag-grid-community/core";
import { DefaultStrategy } from "./selection/strategies/defaultStrategy";
import { GroupSelectsChildrenStrategy } from "./selection/strategies/groupSelectsChildrenStrategy";
let ServerSideSelectionService = class ServerSideSelectionService extends BeanStub {
    init() {
        const groupSelectsChildren = this.gridOptionsService.is('groupSelectsChildren');
        this.addManagedPropertyListener('groupSelectsChildren', (propChange) => {
            this.destroyBean(this.selectionStrategy);
            const StrategyClazz = !propChange.currentValue ? DefaultStrategy : GroupSelectsChildrenStrategy;
            this.selectionStrategy = this.createManagedBean(new StrategyClazz());
            this.shotgunResetNodeSelectionState();
            const event = {
                type: Events.EVENT_SELECTION_CHANGED,
                source: 'api',
            };
            this.eventService.dispatchEvent(event);
        });
        this.rowSelection = this.gridOptionsService.get('rowSelection');
        this.addManagedPropertyListener('rowSelection', (propChange) => this.rowSelection = propChange.currentValue);
        const StrategyClazz = !groupSelectsChildren ? DefaultStrategy : GroupSelectsChildrenStrategy;
        this.selectionStrategy = this.createManagedBean(new StrategyClazz());
    }
    getServerSideSelectionState() {
        return this.selectionStrategy.getSelectedState();
    }
    setServerSideSelectionState(state) {
        this.selectionStrategy.setSelectedState(state);
        this.shotgunResetNodeSelectionState();
        const event = {
            type: Events.EVENT_SELECTION_CHANGED,
            source: 'api',
        };
        this.eventService.dispatchEvent(event);
    }
    setNodesSelected(params) {
        if (params.nodes.length > 1 && this.rowSelection !== 'multiple') {
            console.warn(`AG Grid: cannot multi select while rowSelection='single'`);
            return 0;
        }
        if (params.nodes.length > 1 && params.rangeSelect) {
            console.warn(`AG Grid: cannot use range selection when multi selecting rows`);
            return 0;
        }
        const changedNodes = this.selectionStrategy.setNodesSelected(params);
        this.shotgunResetNodeSelectionState(params.source);
        const event = {
            type: Events.EVENT_SELECTION_CHANGED,
            source: params.source,
        };
        this.eventService.dispatchEvent(event);
        return changedNodes;
    }
    /**
     * Deletes the selection state for a set of nodes, for use after deleting nodes via
     * transaction. As this is designed for transactions, all nodes should belong to the same group.
     */
    deleteSelectionStateFromParent(storeRoute, removedNodeIds) {
        const stateChanged = this.selectionStrategy.deleteSelectionStateFromParent(storeRoute, removedNodeIds);
        if (!stateChanged) {
            return;
        }
        this.shotgunResetNodeSelectionState();
        const event = {
            type: Events.EVENT_SELECTION_CHANGED,
            source: 'api',
        };
        this.eventService.dispatchEvent(event);
    }
    shotgunResetNodeSelectionState(source) {
        this.rowModel.forEachNode(node => {
            if (node.stub) {
                return;
            }
            const isNodeSelected = this.selectionStrategy.isNodeSelected(node);
            if (isNodeSelected !== node.isSelected()) {
                node.selectThisNode(isNodeSelected, undefined, source);
            }
        });
    }
    getSelectedNodes() {
        return this.selectionStrategy.getSelectedNodes();
    }
    getSelectedRows() {
        return this.selectionStrategy.getSelectedRows();
    }
    getSelectionCount() {
        return this.selectionStrategy.getSelectionCount();
    }
    syncInRowNode(rowNode, oldNode) {
        // update any refs being held in the strategies
        this.selectionStrategy.processNewRow(rowNode);
        const isNodeSelected = this.selectionStrategy.isNodeSelected(rowNode);
        rowNode.setSelectedInitialValue(isNodeSelected);
    }
    reset() {
        this.selectionStrategy.deselectAllRowNodes({ source: 'api' });
    }
    isEmpty() {
        return this.selectionStrategy.isEmpty();
    }
    selectAllRowNodes(params) {
        if (params.justCurrentPage || params.justFiltered) {
            console.warn("AG Grid: selecting just filtered only works when gridOptions.rowModelType='clientSide'");
        }
        this.selectionStrategy.selectAllRowNodes(params);
        this.rowModel.forEachNode(node => {
            if (node.stub) {
                return;
            }
            node.selectThisNode(true, undefined, params.source);
        });
        const event = {
            type: Events.EVENT_SELECTION_CHANGED,
            source: params.source,
        };
        this.eventService.dispatchEvent(event);
    }
    deselectAllRowNodes(params) {
        if (params.justCurrentPage || params.justFiltered) {
            console.warn("AG Grid: selecting just filtered only works when gridOptions.rowModelType='clientSide'");
        }
        this.selectionStrategy.deselectAllRowNodes(params);
        this.rowModel.forEachNode(node => {
            if (node.stub) {
                return;
            }
            node.selectThisNode(false, undefined, params.source);
        });
        const event = {
            type: Events.EVENT_SELECTION_CHANGED,
            source: params.source,
        };
        this.eventService.dispatchEvent(event);
    }
    getSelectAllState(justFiltered, justCurrentPage) {
        return this.selectionStrategy.getSelectAllState(justFiltered, justCurrentPage);
    }
    // used by CSRM
    updateGroupsFromChildrenSelections(source, changedPath) {
        return false;
    }
    // used by CSRM
    getBestCostNodeSelection() {
        console.warn('AG Grid: calling gridApi.getBestCostNodeSelection() is only possible when using rowModelType=`clientSide`.');
        return undefined;
    }
    // used by CSRM
    filterFromSelection() {
        return;
    }
};
__decorate([
    Autowired('rowModel')
], ServerSideSelectionService.prototype, "rowModel", void 0);
__decorate([
    PostConstruct
], ServerSideSelectionService.prototype, "init", null);
ServerSideSelectionService = __decorate([
    Bean('selectionService')
], ServerSideSelectionService);
export { ServerSideSelectionService };
