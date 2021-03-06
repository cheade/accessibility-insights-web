// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { Browser } from '../../common/browser';
import { launchBrowser } from '../../common/browser-factory';
import { TargetPageInjectedComponentSelectors } from '../../common/element-identifiers/target-page-selectors';
import { PopupPage } from '../../common/page-controllers/popup-page';
import { TargetPage } from '../../common/page-controllers/target-page';
import { scanForAccessibilityIssues } from '../../common/scan-for-accessibility-issues';

describe('Target Page visualization boxes', () => {
    let browser: Browser;
    let targetPage: TargetPage;
    let popupPage: PopupPage;

    beforeAll(async () => {
        browser = await launchBrowser({ suppressFirstTimeDialog: true });
        targetPage = await browser.newTargetPage();
        popupPage = await browser.newPopupPage(targetPage);
        await popupPage.gotoAdhocPanel();
    });

    beforeEach(async () => {
        await popupPage.disableAllToggles();
        await targetPage.waitForVisualizationBoxesToDisappear();
    });

    afterAll(async () => {
        if (browser) {
            await browser.close();
            browser = undefined;
        }
    });

    const adhocTools = ['Automated checks', 'Headings', 'Landmarks'];

    it.each(adhocTools)('for adhoc tool "%s" should pass accessibility validation', async adhocTool => {
        await popupPage.enableToggleByAriaLabel(adhocTool);

        const shadowRoot = await targetPage.getShadowRoot();
        await targetPage.waitForDescendentSelector(shadowRoot, TargetPageInjectedComponentSelectors.insightsVisualizationBox, {
            visible: true,
        });

        const results = await scanForAccessibilityIssues(targetPage, TargetPageInjectedComponentSelectors.insightsRootContainer);
        expect(results).toHaveLength(0);
    });
});
