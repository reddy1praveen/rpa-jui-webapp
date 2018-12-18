import { PdfRenderService } from './pdf-render.service';
import { ElementRef } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { RenderOptions } from './js-wrapper/renderOptions.model';
import { EmLoggerService } from '../logging/em-logger.service';
import { PdfWrapper } from './js-wrapper/pdf-wrapper';
import { PdfAnnotateWrapper } from './js-wrapper/pdf-annotate-wrapper';
import { BehaviorSubject } from 'rxjs';

class MockPdfAnnotateWrapper {
    renderPage(pageNumber) {}
    enableRect(tool) {}
    disableRect() {}
    createPage() {}
}

class MockPdfWrapper {
    workerSrc() {}
    getDocument(documentId) {}
  }
  
describe('PdfService', () => {
    const mockPdfAnnotateWrapper = new MockPdfAnnotateWrapper();
    const mockPdfWrapper = new MockPdfWrapper();
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          EmLoggerService,
          PdfRenderService,
          { provide: PdfAnnotateWrapper, useFactory: () => mockPdfAnnotateWrapper },
          { provide: PdfWrapper, useFactory: () => mockPdfWrapper }
        ]
      });
    });
  
    describe('constructor', () => {
      it('should be created', inject([PdfRenderService], (service: PdfRenderService) => {
        expect(service).toBeTruthy();
      }));
    });


  describe('render', () => {
    it('render should set workerSrc', inject([PdfRenderService], (service: PdfRenderService) => {
      spyOn(mockPdfWrapper, 'getDocument').and.returnValue(
          new Promise((resolve) => {
            resolve({pdfInfo: { numPages: 65}});
          }
        ));
      service.setRenderOptions(new RenderOptions(
          'documentId',
          null,
          1.33,
          0,
          []
        ));
      const nativeElement = document.createElement('div');
      spyOn(nativeElement, 'appendChild').and.callFake(() => {

      const viewerElementRef = new ElementRef(nativeElement);
      spyOn(mockPdfAnnotateWrapper, 'createPage').and.stub();

      service['viewerElementRef'] = viewerElementRef;
      service.render(viewerElementRef);
      expect(mockPdfAnnotateWrapper.createPage).toHaveBeenCalled();
      });
    }));
  });

  describe('calculateRotation', () => {
    let renderOptions = new RenderOptions(null, null, 1.33, 180, []);

    it('should return the sum value of current rotation and new rotation', inject([PdfRenderService], (service: PdfRenderService) => {
      service.setRenderOptions(renderOptions);
      const rotationAdd = 90;
    //   const rotation = service.calculateRotation({rotationAdd});
      expect(rotation).toBe(renderOptions.rotate + rotationAdd);
    }));

    it('should return 360 degrees as 0', inject([PdfRenderService], (service: PdfRenderService) => {
      service.setRenderOptions(renderOptions);
      const rotationAdd = 180;
    //   const rotation = service.calculateRotation(new PdfPage(rotationAdd));
      expect(rotation).toBe(0);
    }));

    it('should return new rotation in 360 degrees', inject([PdfRenderService], (service: PdfRenderService) => {
      service.setRenderOptions(renderOptions);
      const rotationAdd = 270;
    //   const rotation = service.calculateRotation(new PdfPage(rotationAdd));
      expect(rotation).toBe(90);
    }));

    it('should return rotation in 360 degrees if negative', inject([PdfRenderService], (service: PdfRenderService) => {
      renderOptions = new RenderOptions(null, null, 1.33, -90, null);

      service.setRenderOptions(renderOptions);
      const rotationSubstract = -90;
    //   const rotation = service.calculateRotation(new PdfPage(rotationSubstract));
      expect(rotation).toBe(180);
    }));
  });

  describe('getDataLoadedSub', () => {
    it('should return dataLoadedSubject', inject([PdfRenderService], (service: PdfRenderService) => {
      service['dataLoadedSubject'] = new BehaviorSubject(true);
      service.getDataLoadedSub().subscribe(result => {
        expect(result).toBeTruthy();
      });
    }));
  });

  describe('dataLoadedUpdate', () => {
    it('should set dataLoadedUpdate to true', inject([PdfRenderService], (service: PdfRenderService) => {
      service.dataLoadedUpdate(true);
      service['dataLoadedSubject'].subscribe(result => {
        expect(result).toBeTruthy();
      });
    }));
  });

  describe('getRenderOptions', () => {
    it('should return RENDER_OPTIONS', inject([PdfRenderService], (service: PdfRenderService) => {
      const mockRenderOptions = new RenderOptions('id', null, 1, 0, []);
      service.setRenderOptions(mockRenderOptions);
      expect(service.getRenderOptions().documentId).toBe(mockRenderOptions.documentId);
    }));
  });
});
