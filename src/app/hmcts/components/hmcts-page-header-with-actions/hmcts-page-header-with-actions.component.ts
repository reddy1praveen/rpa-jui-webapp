import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-hmcts-page-header-with-actions',
    templateUrl: './hmcts-page-header-with-actions.component.html',
    styleUrls: ['./hmcts-page-header-with-actions.component.scss']
})
export class HmctsPageHeaderWithActionsComponent implements OnInit {

    @Input() title = {
        html: '<h1 class="govuk-heading-xl">Documentsss</h1>'
    };

    @Input() items = [{
        text: 'Upload new',
        classes: 'hmcts-button--primary'
    }, {
        text: 'Share collection',
        classes: 'hmcts-button--secondary'
    }];

    constructor() {
    }

    ngOnInit() {
    }

}
