import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {PdfService} from '../../data/pdf.service';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-viewer-outline',
    templateUrl: './viewer-outline.component.html',
    styleUrls: ['./viewer-outline.component.scss'],
    providers: []
})
export class ViewerOutlineComponent implements OnInit, OnDestroy {

    outline: any;

    outlineToggle: false;

    dataLoaded: Subscription;

    @Output() itemClicked = new EventEmitter();

    constructor(private pdfService: PdfService) {
    }

    ngOnInit() {
        this.dataLoaded = this.pdfService.getDataLoadedSub().subscribe(() => {
            this.pdfService.getOutline().then( outline => {
                this.outline = outline;
            });
        });
    }

    ngOnDestroy() {
        this.dataLoaded.unsubscribe();
    }

    onItemClicked(item) {
        this.itemClicked.emit(item);
        this.outlineToggle = false;
    }

}
