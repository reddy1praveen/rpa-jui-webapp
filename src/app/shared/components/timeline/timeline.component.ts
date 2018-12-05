import {Component, Input, OnChanges} from '@angular/core';
import {timeDataStamp} from './mock/timeline.mock';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges {
    @Input() events: Array<timeDataStamp>;
    @Input() maxHistory: number;

    ngOnChanges(): void {
        if (this.maxHistory && this.events.length > this.maxHistory) {
            this.events = this.events.slice(0, this.maxHistory);
        }
    }
}
