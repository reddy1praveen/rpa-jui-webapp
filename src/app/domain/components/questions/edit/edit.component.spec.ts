import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditQuestionComponent } from './edit.component';
import { SharedModule } from '../../../../shared/shared.module';
import { DomainModule } from '../../../domain.module';
import { QuestionService } from '../../../services/question.service';
import {Selector} from '../../../../shared/selector-helper';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../../../config.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RedirectionService } from '../../../../routing/redirection.service';
import { CaseService } from '../../../services/case.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { of } from 'rxjs';
import {mockActivateRoute} from '../../../mock/activateRoute.mock';
import {mockConfigService} from '../../../mock/config.mock';
import {mockRedirectionService} from '../../../mock/redirection.mock';

describe('EditQuestionComponent', () => {
    let component: EditQuestionComponent;
    let fixture: ComponentFixture<EditQuestionComponent>;
    let httpMock: HttpTestingController;
    let nativeElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EditQuestionComponent
            ],
            imports: [
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule,
                RouterModule,
                ReactiveFormsModule,
                FormsModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: RedirectionService,
                    useValue: mockRedirectionService
                },
                CaseService,
                QuestionService,
                {
                    provide: ActivatedRoute,
                    useValue: mockActivateRoute
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService
                }
            ]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditQuestionComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        httpMock = TestBed.get(HttpTestingController);
        fixture.detectChanges();
    });

    afterEach( () => {
        httpMock.verify();
    });

    // generateDecisionUrl( jurId: string, caseId: string, pageId: string ) {
    //     return `${this.configService.config.api_base_url}/api/decisions/state/${jurId}/${caseId}/${pageId}`;
    // }

    describe('When request is a success', () => {
        beforeEach(async(() => {
            httpMock
                .expectOne(req => req.method === 'GET' && req.url === '/api/caseQ/13eb9981-9360-4d4b-b9fd-506b5818e7ff/questions/43eb9981-9360-4d4b-b9fd-506b5818e7ff')
                .flush({header: 'Example header', body: 'Example body'});

            fixture.whenStable()
                   .then(() => {
                       fixture.detectChanges();
                   });
        }));

        it('form valid as form is populated with original values', () => {
            // component.ngOnInit();
            // fixture.detectChanges();
            expect(component.form.valid).toBeTruthy();
        });

        it('subject field is populated with original value', () => {
            expect(component.form.controls['subject'].value).toBe('Example header');
        });

        it('question field is populated with original value', () => {
            expect(component.form.controls['question'].value).toBe('Example body');
        });

        it('subject field validity', () => {
            let errors = {};
            const subject = component.form.controls['subject'];

            // Subject field is required
            subject.setValue('');
            errors = subject.errors || {};
            expect(errors['required']).toBeTruthy();

            // Set subject to something correct
            subject.setValue('Example');
            errors = subject.errors || {};
            expect(errors['required']).toBeFalsy();
        });

        it('question field validity', () => {
            let errors = {};
            const question = component.form.controls['subject'];

            // Subject field is required
            question.setValue('');
            errors = question.errors || {};
            expect(errors['required']).toBeTruthy();

            // Set question to something correct
            question.setValue('Example');
            errors = question.errors || {};
            expect(errors['required']).toBeFalsy();
        });

        it('should display a heading', () => {
            expect(nativeElement.querySelector(Selector.selector('edit-question-heading')).textContent).toBe('Edit question');
        });

        it('should display a button to update question item', () => {
            expect(nativeElement.querySelectorAll(Selector.selector('save-button')).length).toBe(1);
        });
    });
});
