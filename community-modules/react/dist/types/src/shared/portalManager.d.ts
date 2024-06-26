import type { ReactPortal } from 'react';
import type { ReactComponent } from './reactComponent';
export declare class PortalManager {
    private refresher;
    private wrappingElement;
    private destroyed;
    private portals;
    private hasPendingPortalUpdate;
    private maxComponentCreationTimeMs;
    constructor(refresher: () => void, wrappingElement?: string, maxComponentCreationTimeMs?: number);
    getPortals(): ReactPortal[];
    destroy(): void;
    destroyPortal(portal: ReactPortal): void;
    getComponentWrappingElement(): string | undefined;
    mountReactPortal(portal: ReactPortal, reactComponent: ReactComponent, resolve: (value: any) => void): void;
    updateReactPortal(oldPortal: ReactPortal, newPortal: ReactPortal): void;
    private batchUpdate;
    waitForInstance(reactComponent: ReactComponent, resolve: (value: any) => void, startTime?: number): void;
}
