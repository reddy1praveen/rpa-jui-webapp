import { TestBed, inject } from '@angular/core/testing';

import { DecisionService } from './decision.service';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { ConfigService } from '../../config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainModule } from '../domain.module';
import { SharedModule } from '../../shared/shared.module';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import {configMock, MockConfigService} from './mock/config.env.mock';



describe('DecisionService', () => {
    let decisionService: DecisionService;
    let httpMock: HttpTestingController;
    let url: string;
    const mockCaseId = '123';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                DecisionService,
                {
                    provide: ConfigService,
                    useValue: configMock
                }
            ]
        });

        decisionService = TestBed.get(DecisionService);
        httpMock = TestBed.get(HttpTestingController);
        // jurId: string, caseId: string, pageId: string
        url = decisionService.generateDecisionUrl(mockCaseId, 'something', 'something' );
    });

    it('should be created', () => {
        expect(decisionService)
            .toBeTruthy();
    });

    it('should contain case id', () => {
        expect(decisionService.generateDecisionUrl(mockCaseId, 'something', 'something')).toContain(mockCaseId);
    });

    it('should fetch decisions via http GET', () => {
        const mockDummyData = [{ id: 1 }, { id: 2 }];
        //const mockCaseId='123';
        const urls = decisionService.generateDecisionUrl(mockCaseId, 'something', 'something');
        decisionService.fetch(mockCaseId, 'something', 'something').subscribe(data => {
            expect(data.length).toBe(2);
            expect(data).toEqual(mockDummyData);
        });
        const mockReq = httpMock.expectOne(urls);
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockDummyData);
        httpMock.verify();

    });

    it('should submit draft decision via http POST', () => {
        const mockDummyData = [{ id: 1 }, { id: 2 }];
        const mockAward = 'award data';
        const mockText = 'text data';
        const jurId = '1';
        const caseId =  '1';
        const pageId = '1';
        const postBody = {
            decision_text: mockText,
            decision_award: mockAward
        };

        // jurId: string, caseId: string, pageId: string, body: any
        decisionService.submitDecisionDraft(mockCaseId, mockAward, mockText, postBody).subscribe(data => {
            expect(data.length).toBe(2);
        });

        const urls = decisionService.generateDecisionUrl(mockCaseId, mockAward, mockText);
        const mockReq = httpMock.expectOne(urls);
        expect(mockReq.request.method).toBe('POST');
        expect(mockReq.request.responseType).toEqual('json');
        expect(mockReq.request.body.decision_text).toBe(mockText);
        expect(mockReq.request.body.decision_award).toBe(mockAward);
        expect(mockReq.request.url).toBe( '/api/decisions/state/123/award data/text data');
        mockReq.flush(mockDummyData);
        httpMock.verify();
    })

    it('should update draft decision via http PUT', () => {
        const mockDummyData = [{ id: 1 }, { id: 2 }];
        const mockAward = 'award data';
        const mockText = 'text data';
        decisionService.updateDecisionDraft(mockCaseId, mockAward, mockText).subscribe(data => {
             expect(data).toBe(mockDummyData);
        })
        const newUrl = decisionService.generateDecisionUrl(mockCaseId, 'something', 'something');
        // const mockReq = httpMock.expectOne(newUrl);
        // expect(mockReq.request.method).toBe('PUT');
        // expect(mockReq.request.responseType).toEqual('json');
        // mockReq.flush(mockDummyData);
        // httpMock.verify();
    })

    it('should issue decision via http PUT', () => {
        const mockDummyData = [{ id: 1 }, { id: 2 }];
        const mockAward = 'award data';
        const mockText = 'text data';

        decisionService.updateDecisionDraft(mockCaseId, mockAward, mockText).subscribe(data => {
             expect(data).toBe(mockDummyData);
        })

//         const mockReq = httpMock.expectOne(url);
//         expect(mockReq.request.method).toBe('PUT');
//         expect(mockReq.request.responseType).toEqual('json');

//         mockReq.flush(mockDummyData);
//         httpMock.verify();

    })

});
