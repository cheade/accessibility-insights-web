// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { NamedSFC } from 'common/react/named-sfc';
import * as React from 'react';

import { OutcomeChip } from './outcome-chip';
import { allRequirementOutcomeTypes, RequirementOutcomeStats } from './requirement-outcome-type';

export const OutcomeChipSet = NamedSFC<RequirementOutcomeStats>('OutcomeChipSet', props => (
    <div className="outcome-chip-set">
        {allRequirementOutcomeTypes.map(outcomeType =>
            props[outcomeType] ? <OutcomeChip key={outcomeType} outcomeType={outcomeType} count={props[outcomeType]} /> : null,
        )}
    </div>
));
