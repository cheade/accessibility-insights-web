// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { shallow } from 'enzyme';
import * as React from 'react';
import { allInstanceOutcomeTypes } from 'reports/components/instance-outcome-type';
import { MinimalRuleHeader, MinimalRuleHeaderProps } from 'reports/components/report-sections/minimal-rule-header';
import { RuleResult } from 'scanner/iruleresults';

describe('MinimalRuleHeader', () => {
    const rule = {
        helpUrl: 'url://help.url',
        id: 'rule id',
        description: 'rule description',
        guidanceLinks: [
            {
                href: 'url://guidance-01.link',
                text: 'guidance-01',
            },
            {
                href: 'url://guidance-02.link',
                text: 'guidance-02',
            },
        ],
        nodes: [{} as AxeNodeResult],
    } as RuleResult;

    it.each(allInstanceOutcomeTypes)('renders, outcomeType = %s', outcomeType => {
        const props: MinimalRuleHeaderProps = {
            rule,
            outcomeType,
        };

        const wrapped = shallow(<MinimalRuleHeader {...props} />);

        expect(wrapped.getElement()).toMatchSnapshot();
    });
});
