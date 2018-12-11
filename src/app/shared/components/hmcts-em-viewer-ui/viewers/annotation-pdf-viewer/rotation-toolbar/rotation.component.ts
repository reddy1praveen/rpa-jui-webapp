import { Component, Input } from '@angular/core';
import { PdfService } from '../../../data/pdf.service';
import { PdfRenderService } from '../../../data/pdf-render.service';
import { PdfAnnotateWrapper } from '../../../data/js-wrapper/pdf-annotate-wrapper';


@Component({
    selector: 'app-rotation-toolbar',
    templateUrl: './rotation.component.html',
    styleUrls: ['./rotation.component.scss'],
    providers: []
})
export class RotationComponent {
    @Input() page: number;
    @Input() top: number;
    @Input() left: number;

    constructor(private pdfRenderService: PdfRenderService,
                private pdfAnnotateWrapper: PdfAnnotateWrapper) {
    }

    calculateRotation(rotateVal): number {
        if (rotateVal >= 0) {
            return (rotateVal >= 360) ? rotateVal - 360 : rotateVal;
        } else {
            return 360 - Math.abs(rotateVal);
        }
    }

    onRotateClockwise() {
        const RENDER_OPTIONS = this.pdfRenderService.getRenderOptions();
        const rotation = RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.page).rotate;
        RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.page).rotate = this.calculateRotation(rotation + 90);
        this.pdfRenderService.setRenderOptions(RENDER_OPTIONS);
        // this.pdfService.render();

        this.pdfAnnotateWrapper.renderPage(this.page, RENDER_OPTIONS).then(() => {
        });
    }
    
     onRotateAntiClockwise() {
        const RENDER_OPTIONS = this.pdfRenderService.getRenderOptions();
        const rotation = RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.page).rotate;
        RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.page).rotate = this.calculateRotation(rotation - 90);
        this.pdfRenderService.setRenderOptions(RENDER_OPTIONS);
        // this.pdfService.render();
    }
}
