import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-case-actions',
    templateUrl: './case-actions.component.html',
    styleUrls: ['./case-actions.component.scss']
})
export class CaseActionsComponent {

    // TODO: This should be an array
    @Input() header = '';
    @Input() actionPrimaryButton;
    @Input() actionSecondaryButton;
    @Input() actionThirdButton;

    constructor() { }

}
