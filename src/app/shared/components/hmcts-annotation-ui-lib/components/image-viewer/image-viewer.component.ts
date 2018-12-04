import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
    providers: []
})
export class ImageViewerComponent {
    
    @Input() url: string;
    @Input() originalUrl: string;

    onRotateClick() {
        
    }
}
