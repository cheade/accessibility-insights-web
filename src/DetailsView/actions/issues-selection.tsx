// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { IObjectWithKey, ISelectionOptions, Selection } from 'office-ui-fabric-react/lib/DetailsList';

export class IssuesSelection extends Selection {
    constructor(options?: ISelectionOptions) {
        super(options);
    }

    // this is a workaround, since DetailsList doesn't support SelectAll on load
    public setItems(items: IObjectWithKey[], shouldClear?: boolean): void {
        this.setChangeEvents(false);
        super.setItems(items, shouldClear);
        this.setAllSelected(true);
        this.setChangeEvents(true);
    }
}
