import { Autowired, PostConstruct } from '../../context/context';
import { Component } from '../../widgets/component';
import { UserComponentFactory } from '../../components/framework/userComponentFactory';
import { RefSelector } from '../../widgets/componentAnnotations';
import { ILoadingOverlayComp, ILoadingOverlayParams } from './loadingOverlayComponent';
import { INoRowsOverlayComp, INoRowsOverlayParams } from './noRowsOverlayComponent';
import { AgPromise , _} from '../../utils';
import { clearElement } from '../../utils/dom';
import { LayoutCssClasses, LayoutFeature, LayoutView, UpdateLayoutClassesParams } from "../../styling/layoutFeature";
import { PaginationProxy } from "../../pagination/paginationProxy";
import { Events } from "../../eventKeys";
import { GridApi } from "../../gridApi";
import { ColumnModel } from "../../columns/columnModel";
import { WithoutGridCommon } from '../../interfaces/iCommon';

enum LoadingType { Loading, NoRows }

export class OverlayWrapperComponent extends Component implements LayoutView {

    // wrapping in outer div, and wrapper, is needed to center the loading icon
    private static TEMPLATE = /* html */`
        <div class="ag-overlay" aria-hidden="true">
            <div class="ag-overlay-panel">
                <div class="ag-overlay-wrapper" ref="eOverlayWrapper"></div>
            </div>
        </div>`;

    @Autowired('userComponentFactory') userComponentFactory: UserComponentFactory;
    @Autowired('paginationProxy') private paginationProxy: PaginationProxy;
    @Autowired('gridApi') private gridApi: GridApi;
    @Autowired('columnModel') private columnModel: ColumnModel;

    @RefSelector('eOverlayWrapper') eOverlayWrapper: HTMLElement;

    private activeOverlay: ILoadingOverlayComp;
    private inProgress = false;
    private destroyRequested = false;
    private manuallyDisplayed: boolean = false;

    private isLoadingPresent: boolean;

    constructor() {
        super(OverlayWrapperComponent.TEMPLATE);
    }

    public updateLayoutClasses(cssClass: string, params: UpdateLayoutClassesParams): void {
        const overlayWrapperClassList = this.eOverlayWrapper.classList;
        overlayWrapperClassList.toggle(LayoutCssClasses.AUTO_HEIGHT, params.autoHeight);
        overlayWrapperClassList.toggle(LayoutCssClasses.NORMAL, params.normal);
        overlayWrapperClassList.toggle(LayoutCssClasses.PRINT, params.print);
    }

    @PostConstruct
    private postConstruct(): void {
        this.createManagedBean(new LayoutFeature(this));
        this.setDisplayed(false, { skipAriaHidden: true });

        this.isLoadingPresent = this.gridOptionsService.exists('loading');

        this.addManagedListener(this.eventService, Events.EVENT_ROW_DATA_UPDATED, this.onRowDataUpdated.bind(this));
        this.addManagedListener(
            this.eventService,
            Events.EVENT_NEW_COLUMNS_LOADED,
            this.onNewColumnsLoaded.bind(this)
        );

        const updateOverlay = (isLoading: boolean) => {
            if (isLoading) {
                this.showLoadingOverlay();
            } else {
                this.showOrHideOverlay();
            }
        };
        this.addManagedPropertyListener('loading', (event) => updateOverlay(event.currentValue));

        if (this.isLoadingPresent) {
            if(this.gridOptionsService.is('loading')){
                updateOverlay(true);
            }
        } else {
            // Setup the initial loading overlay if loading is not manually being controlled
            if (this.gridOptionsService.isRowModelType('clientSide') && !this.gridOptionsService.get('rowData')) {
                this.showLoadingOverlay();
            }
        }

        this.gridApi.registerOverlayWrapperComp(this);
    }

    private setWrapperTypeClass(loadingType: LoadingType): void {
        const overlayWrapperClassList = this.eOverlayWrapper.classList;
        overlayWrapperClassList.toggle('ag-overlay-loading-wrapper', loadingType === LoadingType.Loading);
        overlayWrapperClassList.toggle('ag-overlay-no-rows-wrapper', loadingType === LoadingType.NoRows);
    }

    private warnOnce(message: string): void {
        _.doOnce(() => console.warn("AG Grid: " + message), message);
    }

    public showLoadingOverlay(): void {
        if (this.gridOptionsService.is('suppressLoadingOverlay')) {
            return;
        }
        if (this.isLoadingPresent && !this.gridOptionsService.is('loading')) {
            this.warnOnce('api.showLoadingOverlay() is ignored as grid option loading=false. Set loading=true to show loading overlay.');
            return;
        }
        const params: WithoutGridCommon<ILoadingOverlayParams> = {};

        const compDetails = this.userComponentFactory.getLoadingOverlayCompDetails(params);
        const promise = compDetails.newAgStackInstance();

        this.showOverlay(promise, LoadingType.Loading);
    }

    public showNoRowsOverlay(): void {
        if (this.gridOptionsService.is('suppressNoRowsOverlay')) { return; }

        if (this.gridOptionsService.is('loading')) {
            this.warnOnce('GridOption loading=true, so api.showNoRowsOverlay() is ignored.');
            return;
        }

        const params: WithoutGridCommon<INoRowsOverlayParams> = {};

        const compDetails = this.userComponentFactory.getNoRowsOverlayCompDetails(params);
        const promise = compDetails.newAgStackInstance();

        this.showOverlay(promise, LoadingType.NoRows);
    }

    private showOverlay(workItem: AgPromise<ILoadingOverlayComp | INoRowsOverlayComp> | null, type: LoadingType): void {
        if (this.inProgress) {
            return;
        }

        this.setWrapperTypeClass(type);
        this.destroyActiveOverlay();

        this.inProgress = true;

        if (workItem) {
            workItem.then(comp => {
                this.inProgress = false;

                this.eOverlayWrapper.appendChild(comp!.getGui());
                this.activeOverlay = comp!;

                if (this.destroyRequested) {
                    this.destroyRequested = false;
                    this.destroyActiveOverlay();
                }
            });
        }

        this.manuallyDisplayed = this.columnModel.isReady() && !this.paginationProxy.isEmpty();
        this.setDisplayed(true, { skipAriaHidden: true });
    }

    private destroyActiveOverlay(): void {
        if (this.inProgress) {
            this.destroyRequested = true;
            return;
        }

        if (!this.activeOverlay) {
            return;
        }

        this.activeOverlay = this.getContext().destroyBean(this.activeOverlay)!;

        clearElement(this.eOverlayWrapper);
    }

    public hideOverlay(): void {
        if (this.gridOptionsService.is('loading')) {
            this.warnOnce('To hide the loading overlay call api.setLoading(false) or set loading=false.');
            return;
        }

        this.manuallyDisplayed = false;
        this.destroyActiveOverlay();
        this.setDisplayed(false, { skipAriaHidden: true });
    }

    public destroy(): void {
        this.destroyActiveOverlay();
        super.destroy();
    }

    private showOrHideOverlay(): void {
        // Don't hide or show if loading overlay is present
        if(this.gridOptionsService.is('loading')) { return; }
        
        const isEmpty = this.paginationProxy.isEmpty();
        const isSuppressNoRowsOverlay = this.gridOptionsService.is('suppressNoRowsOverlay');
        if (isEmpty && !isSuppressNoRowsOverlay) {
            this.showNoRowsOverlay();
        } else {
            this.hideOverlay();
        }
    }

    private onRowDataUpdated(): void {
        this.showOrHideOverlay();
    }

    private onNewColumnsLoaded(): void {
        // hide overlay if columns and rows exist, this can happen if columns are loaded after data.
        // this problem exists before of the race condition between the services (column controller in this case)
        // and the view (grid panel). if the model beans were all initialised first, and then the view beans second,
        // this race condition would not happen.
        if (this.columnModel.isReady() && !this.paginationProxy.isEmpty() && !this.manuallyDisplayed) {
            this.hideOverlay();
        }
    }

}
