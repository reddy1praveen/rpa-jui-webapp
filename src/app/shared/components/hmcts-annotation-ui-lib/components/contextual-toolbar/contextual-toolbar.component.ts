import {Component, OnInit, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { PdfService } from '../../data/pdf.service';
import { AnnotationStoreService } from '../../data/annotation-store.service';
import { Annotation } from '../../data/annotation-set.model';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-contextual-toolbar',
  templateUrl: './contextual-toolbar.component.html',
  styleUrls: ['./contextual-toolbar.component.scss']
})
export class ContextualToolbarComponent implements OnInit, OnDestroy {

  toolPos: {left, top};
  isShowToolbar: boolean;
  showDelete: boolean;
  annotationId: string;
  annotationSavedSub: Subscription;

  constructor(private pdfService: PdfService,
              private annotationStoreService: AnnotationStoreService,
              private ref: ChangeDetectorRef,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    this.annotationSavedSub = this.annotationStoreService.getAnnotationSaved().subscribe(
      contextualOptions => {
        if (contextualOptions.annotation != null) {
          this.showToolBar(contextualOptions.annotation, contextualOptions.showDelete);
        } else {
          this.hideToolBar();
        }
      });

    this.isShowToolbar = false;
    this.toolPos = {
      left: 0,
      top: 0
    };
  }

  ngOnDestroy(): void {
    this.ref.detach();
    if (this.annotationSavedSub) {
      this.annotationSavedSub.unsubscribe();
    }
  }

  showToolBar(annotation: Annotation, showDelete?: boolean) {
    this.showDelete = showDelete;

    this.toolPos = this.getRelativePosition(annotation.id);
    this.annotationId = annotation.id;
    this.isShowToolbar = true;

    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
  }

  getRelativePosition(annotationId: string): {left: number; top: number} {
    const svgSelector = this.document.querySelector(`g[data-pdf-annotate-id="${annotationId}"]`);
    const highlightRect = <DOMRect>svgSelector.getBoundingClientRect();

    const wrapper = this.document.querySelector('#annotation-wrapper');
    const wrapperRect = <DOMRect>wrapper.getBoundingClientRect();

    const left = ((highlightRect.x - wrapperRect.left)
      - 108) + highlightRect.width / 2; // Minus half the toolbar width + half the length of the highlight
    const top = ((highlightRect.y - wrapperRect.top)
      - 59) - 5; // Minus height of toolbar + 5px

    return {
      left,
      top
    };
  }

  hideToolBar() {
    this.isShowToolbar = false;
  }

  handleCommentBtnClick() {
    this.pdfService.setAnnotationClicked(this.annotationId);
    this.hideToolBar();
  }

  handleHighlightBtnClick() {
    this.pdfService.setAnnotationClicked(null);
    this.hideToolBar();
  }

  handleDeleteBtnClick() {
    this.annotationStoreService.deleteAnnotationById(this.annotationId);
    this.hideToolBar();
  }

  handleClearAnnotations() {
    this.annotationStoreService.clearAnnotations();
  }
}
