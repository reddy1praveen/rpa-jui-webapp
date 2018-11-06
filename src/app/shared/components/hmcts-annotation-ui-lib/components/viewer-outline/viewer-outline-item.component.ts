import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
    selector: 'app-viewer-outline-item',
    template: `<ul>
        <li ><a (click)="outlineItemClicked(item)" class="outline-item-label">{{item.title}}</a></li>
        <ul *ngIf="item.items">
            <app-viewer-outline-item (itemClicked)="outlineItemClicked(item)" [item]="item" *ngFor="let item of item.items">
            </app-viewer-outline-item>
        </ul>
    </ul>`,
    styleUrls: ['./viewer-outline.component.scss'],
    providers: []
})
export class ViewerOutlineItemComponent {

    @Input() item: any;

    @Output() itemClicked = new EventEmitter();

    constructor() {
    }

    outlineItemClicked(item) {
        this.itemClicked.emit(item);
    }


}
