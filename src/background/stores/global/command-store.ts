// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { StoreNames } from '../../../common/stores/store-names';
import { ModifiedCommandsTelemetryData, SHORTCUT_MODIFIED } from '../../../common/telemetry-events';
import { CommandStoreData } from '../../../common/types/store-data/command-store-data';
import { CommandActions, GetCommandsPayload } from '../../actions/command-actions';
import { TelemetryEventHandler } from '../../telemetry/telemetry-event-handler';
import { BaseStoreImpl } from '../base-store-impl';

export class CommandStore extends BaseStoreImpl<CommandStoreData> {
    private commandActions: CommandActions;
    private telemetryEventHandler: TelemetryEventHandler;

    constructor(commandActions: CommandActions, telemetryEventHandler: TelemetryEventHandler) {
        super(StoreNames.CommandStore);

        this.commandActions = commandActions;
        this.telemetryEventHandler = telemetryEventHandler;
    }

    public getDefaultState(): CommandStoreData {
        const defaultValues: CommandStoreData = {
            commands: [],
        };

        return defaultValues;
    }

    protected addActionListeners(): void {
        this.commandActions.getCommands.addListener(this.onGetCommands);
    }

    private onGetCommands = (payload: GetCommandsPayload): void => {
        const modifiedCommands: chrome.commands.Command[] = this.getModifiedCommands(payload.commands);
        if (modifiedCommands.length > 0) {
            const telemetry: ModifiedCommandsTelemetryData = {
                modifiedCommands: JSON.stringify(modifiedCommands),
            };

            const telemetryPayload = { telemetry };

            this.telemetryEventHandler.publishTelemetry(SHORTCUT_MODIFIED, telemetryPayload);
        }

        this.state.commands = payload.commands;
        this.emitChanged();
    };

    private getModifiedCommands(currentCommands: chrome.commands.Command[]): chrome.commands.Command[] {
        if (currentCommands.length !== this.state.commands.length) {
            return [];
        }

        const modifiedCommands: chrome.commands.Command[] = currentCommands.filter((command: chrome.commands.Command, index: number) => {
            return command.shortcut !== this.state.commands[index].shortcut;
        });

        return modifiedCommands;
    }
}
