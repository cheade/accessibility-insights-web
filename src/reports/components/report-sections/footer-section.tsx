// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as React from 'react';

import { NewTabLink } from 'common/components/new-tab-link';
import { NamedSFC } from 'common/react/named-sfc';
import { toolName } from 'content/strings/application';

import { reportFooter, reportFooterContainer } from './footer-section.scss';

export const FooterSection = NamedSFC('FooterSection', () => {
    return (
        <div className={reportFooterContainer}>
            <div className={reportFooter} role="contentinfo">
                This automated checks result was generated using <b id="tool-name">{toolName}</b>, a tool that helps debug and find
                accessibility issues earlier. Get more information & download this tool at{' '}
                <NewTabLink
                    href="http://aka.ms/AccessibilityInsights"
                    aria-labelledby="tool-name"
                    title={`Get more information and download ${toolName}`}
                >
                    http://aka.ms/AccessibilityInsights
                </NewTabLink>
                .
            </div>
        </div>
    );
});
