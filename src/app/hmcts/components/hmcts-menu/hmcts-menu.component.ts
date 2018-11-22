import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-hmcts-menu',
    templateUrl: './hmcts-menu.component.html',
    styleUrls: ['./hmcts-menu.component.scss']
})
export class HmctsMenuComponent implements OnInit {

    // TODO: Pass this in.
    @Input() items = [{
        text: 'Make decision'
    }, {
        text: 'List for hearings',
        classes: 'hmcts-button--secondary'
    }, {
        text: 'End case',
        classes: 'hmcts-button--secondary'
    }];

    constructor() {
    }

    ngOnInit() {
    }

}
