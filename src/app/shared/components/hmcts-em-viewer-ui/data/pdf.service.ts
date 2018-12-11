import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { EmLoggerService } from '../logging/em-logger.service';
import { PdfPage } from './js-wrapper/pdf-page';
import { RenderOptions } from './js-wrapper/renderOptions.model';
import { RotationFactoryService } from '../viewers/rotation-factory.service';
import { PdfRenderService } from './pdf-render.service';

@Injectable()
export class PdfService {

    private pdfPages: number;
    private pageNumber: BehaviorSubject<number>;
    private dataLoadedSubject: BehaviorSubject<boolean>;
    private viewerElementRef: ElementRef;
    private annotationWrapper: ElementRef;

    constructor(private log: EmLoggerService,
                private pdfWrapper: PdfWrapper,
                private pdfAnnotateWrapper: PdfAnnotateWrapper,
                private rotationFactoryService: RotationFactoryService,
                private pdfRenderService: PdfRenderService) {
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

    render(viewerElementRef?: ElementRef) {
        if (viewerElementRef != null) {
            this.viewerElementRef = viewerElementRef;
        }
        this.log.info('Rendering PDF document');
        const renderOptions = this.pdfRenderService.getRenderOptions();
        this.pdfWrapper.getDocument(renderOptions.documentId)
            .then(pdf => {
                renderOptions.pdfDocument = pdf;
                const viewer = this.viewerElementRef.nativeElement;
                viewer.innerHTML = '';
                this.pdfPages = pdf.pdfInfo.numPages;

                for (let i = 1; i < this.pdfPages + 1; i++) {
                    const page = this.pdfAnnotateWrapper.createPage(i);
                    
                    // Create a copy of the render options for each page.
                    const pageOptions = Object.assign({}, renderOptions);
                    viewer.appendChild(page);
                    pdf.getPage(i).then((pdfPage) => {
                        // Get current page rotation from page rotation objects
                        pageOptions.rotate = this.getPageRotation(renderOptions, pageOptions, pdfPage);
                        setTimeout(() => {
                            this.pdfAnnotateWrapper.renderPage(i, pageOptions).then(() => {
                                if (i === this.pdfPages - 1) {
                                    this.dataLoadedUpdate(true);
                                    this.pdfRenderService.setRenderOptions(renderOptions);
                                }
                            });
                        });
                    });

                    const rect = page.getBoundingClientRect();
                    this.rotationFactoryService.addToDom(i, rect);
                }
            }).catch(
            (error) => {
                const errorMessage = new Error('Unable to render your supplied PDF. ' +
                renderOptions.documentId + '. Error is: ' + error);
                this.log.error(errorMessage);
            }
        );
    }

    getPageRotation(renderOptions: RenderOptions, pageOptions: RenderOptions, pdfPage: any): number {
        let rotation = pageOptions.rotationPages
            .filter(rotateObj => rotateObj.page === pdfPage.pageNumber)
            .map(rotateObj => rotateObj.rotate)[0];
        if (!rotation) {
            renderOptions.rotationPages.push({page: pdfPage.pageNumber, rotate: pdfPage.rotate});
            rotation = pdfPage.rotate;
        }
        return rotation;
    }

    setHighlightTool() {
        this.pdfAnnotateWrapper.enableRect('highlight');
    }

    setCursorTool() {
        this.pdfAnnotateWrapper.disableRect();
    }
}
