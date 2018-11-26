import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-hmcts-menu',
    templateUrl: './hmcts-menu.component.html',
    styleUrls: ['./hmcts-menu.component.scss']
})
export class HmctsMenuComponent implements OnInit {

    // TODO: We should make sure that
    @Input() items = [{
        text: 'Default Button 1'
    }, {
        text: 'Default Button 2',
        classes: 'hmcts-button--secondary'
    }, {
        text: 'Default Button 3',
        classes: 'hmcts-button--secondary'
    }];

    constructor() {
    }

    ngOnInit() {
    }

}
