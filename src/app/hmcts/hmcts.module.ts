import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HmctsGlobalHeaderComponent } from './components/hmcts-global-header/hmcts-global-header.component';
import { HmctsProgressBarComponent } from './components/hmcts-progress-bar/hmcts-progress-bar.component';
import { HmctsPrimaryNavigationComponent } from './components/hmcts-primary-navigation/hmcts-primary-navigation.component';
import { HmctsSubNavigationComponent } from './components/hmcts-sub-navigation/hmcts-sub-navigation.component';
import { HmctsTimelineComponent } from './components/hmcts-timeline/hmcts-timeline.component';
import {RouterModule} from '@angular/router';
import {SentenceCasePipe} from './pipes/sentence-case/sentence-case-pipe';
import { HmctsAlertComponent } from './components/hmcts-alert/hmcts-alert.component';
import { HmctsDetailsBarComponent } from './components/hmcts-details-bar/hmcts-details-bar.component';
import { HmctsGlobalFooterComponent } from './components/hmcts-global-footer/hmcts-global-footer.component';
import { HmctsPageHeaderWithActionsComponent } from './components/hmcts-page-header-with-actions/hmcts-page-header-with-actions.component';
import { HmctsMenuComponent } from './components/hmcts-menu/hmcts-menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HmctsGlobalHeaderComponent,
        HmctsProgressBarComponent,
        HmctsPrimaryNavigationComponent,
        HmctsSubNavigationComponent,
        HmctsTimelineComponent,
        HmctsAlertComponent,
        SentenceCasePipe,
        HmctsDetailsBarComponent,
        HmctsGlobalFooterComponent,
        HmctsPageHeaderWithActionsComponent,
        HmctsMenuComponent,
    ],
    exports: [
        HmctsGlobalHeaderComponent,
        HmctsProgressBarComponent,
        HmctsPrimaryNavigationComponent,
        HmctsSubNavigationComponent,
        HmctsTimelineComponent,
        HmctsAlertComponent,
        SentenceCasePipe,
        HmctsDetailsBarComponent,
        HmctsGlobalFooterComponent,
        HmctsPageHeaderWithActionsComponent,
        HmctsMenuComponent,
    ]
})
export class HmctsModule {

}
