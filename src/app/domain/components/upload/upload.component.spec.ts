import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {DocumentStoreService} from '../../../shared/services/documentStore/document-store.service';

import {UploadComponent} from './upload.component';

class MockDocumentStoreService {
    postFile() {
    }
}

fdescribe('UploadComponent', () => {

    let component: UploadComponent;
    let fixture: ComponentFixture<UploadComponent>;

    const mockDocumentStoreService = new MockDocumentStoreService();

    const blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'filename';

    const fakeFile = <File>blob;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UploadComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                UploadComponent,
                {provide: DocumentStoreService, useFactory: () => mockDocumentStoreService }
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadComponent);
        component = fixture.componentInstance;
    });

    it('should set and get an input file.', () => {

        component.inputFileHandler(fakeFile);

        expect(component.inputFile).toBe(fakeFile);
    });

    // it('should send file to document service.', () => {
    //
    //     const blob = new Blob([''], { type: 'text/html' });
    //     blob['lastModifiedDate'] = '';
    //     blob['name'] = 'filename';
    //
    //     const fakeFile = <File>blob;
    //
    //     spyOn(mockDocumentStoreService, 'postFile');
    //
    //     component.postFile(fakeFile);
    //
    //     expect(component.inputFile).toBe(fakeFile);
    // });


    // Works
    it('should hook into component class function', () => {

        expect(component.testFunction()).toBeFalsy();
    });

    // Works
    it('should contain upload new item', () => {
        const inputElement: HTMLElement = fixture.nativeElement;
        expect(inputElement.textContent).toContain('Upload new item');
    });
});


// describe('LightswitchComp', () => {
//     it('#clicked() should toggle #isOn', () => {
//         const comp = new LightswitchComponent();
//         expect(comp.isOn).toBe(false, 'off at first');
//         comp.clicked();
//         expect(comp.isOn).toBe(true, 'on after click');
//         comp.clicked();
//         expect(comp.isOn).toBe(false, 'off after second click');
//     });
//
//     it('#clicked() should set #message to "is on"', () => {
//         const comp = new LightswitchComponent();
//         expect(comp.message).toMatch(/is off/i, 'off at first');
//         comp.clicked();
//         expect(comp.message).toMatch(/is on/i, 'on after clicked');
//     });
// });
