// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CommandActions } from 'background/actions/command-actions';
import { FeatureFlagActions } from 'background/actions/feature-flag-actions';
import { GlobalActionHub } from 'background/actions/global-action-hub';
import { LaunchPanelStateActions } from 'background/actions/launch-panel-state-action';
import { ScopingActions } from 'background/actions/scoping-actions';

describe('GlobalActionHubTest', () => {
    it('tests constructor', () => {
        const globalActionHub = new GlobalActionHub();
        runNullAsserts(globalActionHub);
        runTypeAsserts(globalActionHub);
    });
});

function runNullAsserts(hub: GlobalActionHub): void {
    Object.keys(hub).forEach(key => {
        expect(key).toBeDefined();
    });
}

function runTypeAsserts(hub: GlobalActionHub): void {
    expect(hub.commandActions instanceof CommandActions).toBeTruthy();
    expect(hub.featureFlagActions instanceof FeatureFlagActions).toBeTruthy();
    expect(hub.launchPanelStateActions instanceof LaunchPanelStateActions).toBeTruthy();
    expect(hub.scopingActions instanceof ScopingActions).toBeTruthy();
}
