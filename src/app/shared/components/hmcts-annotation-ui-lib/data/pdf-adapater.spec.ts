import { TestBed, inject } from '@angular/core/testing';
import { Utils } from './utils';
import { PdfAdapter } from './pdf-adapter';
import { AnnotationSet, Annotation, Comment } from './annotation-set.model';

class MockUtils {

}

fdescribe('PdfAdapter', () => {
    const mockUtils = new MockUtils();

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
              PdfAdapter,
              { provide: Utils, useFactory: () => mockUtils}
            ]
        });
      });

    describe('constructor', () => {
        it('should be created', inject([PdfAdapter], (service: PdfAdapter) => {
            expect(service).toBeTruthy();
        }));

        it('should instantiate annotationChangeSubject', inject([PdfAdapter], (service: PdfAdapter) => {
            expect(service['annotationChangeSubject']).toBeTruthy();
        }));
    });

    describe('setStoreData', () => {
        const mockAnnotation = new Annotation(
            '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
            '9ad31e66-ec05-476d-9a38-09973d51c0c3',
            '111111', new Date(), null,
            '111111', null, new Date(), 'docId',
            1, 'red', [new Comment(
                'cfe6bdad-8fc5-4240-adfc-d583bdaee47a',
                '22a3bde9-18d6-46b2-982b-36e0a631ea4b',
                '111111', null, new Date(), null, null, null,
                'comment content'
            )]
        );
        const mockAnnotationSet = new AnnotationSet(
            '9ad31e66-ec05-476d-9a38-09973d51c0c3',
            '111111',
            null,
            new Date(),
            '111111', null,
            new Date(),
            '',
            [mockAnnotation]
        );

        it('should set annotationSet', inject([PdfAdapter], (service: PdfAdapter) => {
            service.setStoreData(mockAnnotationSet);
        }));

        it('should set commentData to a list of annotation comments', inject([PdfAdapter], (service: PdfAdapter) => {
            service.setStoreData(mockAnnotationSet);
            expect(service['commentData'].length).toBe(1);
        }));

        it('should set the annotationSetId', inject([PdfAdapter], (service: PdfAdapter) => {
            service.setStoreData(mockAnnotationSet);
            expect(service['annotationSetId']).toBe(mockAnnotationSet.id);
        }));
    });
});
