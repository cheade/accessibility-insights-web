// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { StoreNames } from '../../common/stores/store-names';
import { DevToolState } from '../../common/types/store-data/idev-tool-state';
import { DevToolActions } from '../actions/dev-tools-actions';
import { BaseStoreImpl } from './base-store-impl';

export class DevToolStore extends BaseStoreImpl<DevToolState> {
    private devToolActions: DevToolActions;

    constructor(devToolActions: DevToolActions) {
        super(StoreNames.DevToolsStore);

        this.devToolActions = devToolActions;
    }

    public getDefaultState(): DevToolState {
        const defaultValues: DevToolState = {
            isOpen: false,
            inspectElementRequestId: 0,
        };

        return defaultValues;
    }

    protected addActionListeners(): void {
        this.devToolActions.setDevToolState.addListener(this.onDevToolStatusChanged);
        this.devToolActions.setInspectElement.addListener(this.onInspectElement);
        this.devToolActions.setFrameUrl.addListener(this.onSetFrameUrl);

        this.devToolActions.getCurrentState.addListener(this.onGetCurrentState);
    }

    private onDevToolStatusChanged = (status: boolean): void => {
        if (this.state.isOpen !== status) {
            this.state.isOpen = status;
            this.state.frameUrl = null;
            this.state.inspectElement = null;
            this.emitChanged();
        }
    };

    private onInspectElement = (target: string[]): void => {
        this.state.inspectElement = target;
        this.state.frameUrl = null;
        // we're only using this to make sure the store proxy emit the change when the user inspect the same element twice
        this.state.inspectElementRequestId++;
        this.emitChanged();
    };

    private onSetFrameUrl = (frameUrl: string): void => {
        this.state.frameUrl = frameUrl;
        this.emitChanged();
    };
}
