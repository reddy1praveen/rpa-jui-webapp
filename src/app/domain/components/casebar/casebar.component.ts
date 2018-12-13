import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';
import {CaseDataOther} from '../../../routing/pages/modules/case';
import {LinkItem} from '../../case-viewer/components/summary-panel/models/elements.module';

@Component({
        selector: 'app-casebar',
    templateUrl: './casebar.component.html',
    styleUrls: ['./casebar.component.scss']
})
export class CaseBarComponent {

    @Input() case: CaseDataOther;
    public createLink: LinkItem = { href: '../decision/create', text: 'Make decision' };
    public hearingLink: LinkItem = {href: '../hearing/list', text: 'List for hearing'};
    constructor() {}

}
