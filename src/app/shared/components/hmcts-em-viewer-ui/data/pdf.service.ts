import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { EmLoggerService } from '../logging/em-logger.service';
import { PdfPage } from './js-wrapper/pdf-page';
import { RenderOptions } from './js-wrapper/renderOptions.model';

@Injectable()
export class PdfService {

    private pdfPages: number;
    private RENDER_OPTIONS: RenderOptions;
    private pageNumber: BehaviorSubject<number>;
    private dataLoadedSubject: BehaviorSubject<boolean>;
    private viewerElementRef: ElementRef;
    private annotationWrapper: ElementRef;

    constructor(private log: EmLoggerService,
                private pdfWrapper: PdfWrapper,
                private pdfAnnotateWrapper: PdfAnnotateWrapper) {
        this.dataLoadedSubject = new BehaviorSubject(false);
        log.setClass('PdfService');
    }

    preRun() {
        const workerLocation = '/public/javascripts/pdf.worker.js';
        this.log.info('point to workSrc file:' + workerLocation);
        this.pdfWrapper.workerSrc(workerLocation);
        this.pageNumber = new BehaviorSubject(1);
    }

    getPdfPages(): number {
        return this.pdfPages;
    }

    getAnnotationWrapper(): ElementRef {
        return this.annotationWrapper;
    }

    setAnnotationWrapper(annotationWrapper: ElementRef) {
        this.annotationWrapper = annotationWrapper;
    }

    getViewerElementRef(): ElementRef {
        return this.viewerElementRef;
    }

    getDataLoadedSub(): BehaviorSubject<boolean> {
        return this.dataLoadedSubject;
    }

    dataLoadedUpdate(isLoaded: boolean) {
        this.dataLoadedSubject.next(isLoaded);
    }

    getPageNumber(): BehaviorSubject<number> {
        return this.pageNumber;
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber.next(pageNumber);
    }

    getRenderOptions() {
        return Object.assign({}, this.RENDER_OPTIONS);
    }

    setRenderOptions(RENDER_OPTIONS: RenderOptions): any {
        this.RENDER_OPTIONS = RENDER_OPTIONS;
    }

    render(viewerElementRef?: ElementRef) {
        if (viewerElementRef != null) {
            this.viewerElementRef = viewerElementRef;
        }
        this.log.info('Rendering PDF document');
        this.pdfWrapper.getDocument(this.RENDER_OPTIONS.documentId)
            .then(pdf => {
                this.RENDER_OPTIONS.pdfDocument = pdf;
                const viewer = this.viewerElementRef.nativeElement;
                viewer.innerHTML = '';
                this.pdfPages = pdf.pdfInfo.numPages;

                for (let i = 1; i < this.pdfPages; i++) {
                    const page = this.pdfAnnotateWrapper.createPage(i);
                    
                    // Create a copy of the render options for each page.
                    const pageOptions = Object.assign({}, this.RENDER_OPTIONS);
                    viewer.appendChild(page);
                    pdf.getPage(i).then((pdfPage) => {
                        // Get current page rotation from page rotation objects
                        pageOptions.rotate = this.getPageRotation(pageOptions, pdfPage);
                        setTimeout(() => {
                            this.pdfAnnotateWrapper.renderPage(i, pageOptions).then(() => {
                                if (i === this.pdfPages - 1) {
                                    this.dataLoadedUpdate(true);
                                }
                            });
                        });
                        
                    });
                }
            }).catch(
            (error) => {
                const errorMessage = new Error('Unable to render your supplied PDF. ' +
                    this.RENDER_OPTIONS.documentId + '. Error is: ' + error);
                this.log.error(errorMessage);
            }
        );
    }

    getPageRotation(pageOptions: RenderOptions, pdfPage: any): number {
        let rotation = pageOptions.rotationPages
            .filter(rotateObj => rotateObj.page === pdfPage.pageNumber)
            .map(rotateObj => rotateObj.rotate)[0];
        if (!rotation) {
            this.RENDER_OPTIONS.rotationPages.push({page: pdfPage.pageNumber, rotate: pdfPage.rotate});
            rotation = pdfPage.rotate;
        }
        return rotation;
    }

    calculateRotation(pdfPage): number {
        const rotateVal = pdfPage.rotate + this.RENDER_OPTIONS.rotate;
        if (rotateVal >= 0) {
            return (rotateVal >= 360) ? rotateVal - 360 : rotateVal;
        } else {
            return 360 - Math.abs(rotateVal);
        }
    }

    setHighlightTool() {
        this.pdfAnnotateWrapper.enableRect('highlight');
    }

    setCursorTool() {
        this.pdfAnnotateWrapper.disableRect();
    }
}
