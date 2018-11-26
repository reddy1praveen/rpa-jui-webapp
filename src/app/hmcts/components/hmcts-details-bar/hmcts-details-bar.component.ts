import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-hmcts-details-bar',
    templateUrl: './hmcts-details-bar.component.html',
    styleUrls: ['./hmcts-details-bar.component.scss']
})
export class HmctsDetailsBarComponent implements OnInit {

    @Input() reference;
    @Input() title;
    @Input() items;

    constructor() { }

    ngOnInit() {
    }

}
