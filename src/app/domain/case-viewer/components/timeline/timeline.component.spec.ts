import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseViewerModule } from '../../case-viewer.module';
import { DebugElement } from '@angular/core';
import { Selector } from '../../../../../../test/selector-helper';
import {TimelineComponent} from './timeline.component';

describe('TimelineComponent', () => {
    let component: TimelineComponent;
    let fixture: ComponentFixture<TimelineComponent>;
    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CaseViewerModule]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelineComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when some data is available', () => {
        beforeEach(async(() => {
            component.events = [
                {
                    event_name: 'HEARING',
                    user_first_name: 'John',
                    user_last_name: 'Smith',
                    created_date: new Date()
                },
                {
                    event_name: 'CREATED_EVENT',
                    user_first_name: 'Gilbert',
                    user_last_name: 'Smith',
                    created_date: new Date()
                }
            ];

            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });
        }));

        it('should see two events', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-item')).length).toBe(2);
        });

        it('should see HEARING first and CREATED_EVENT second', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-event-name'))[0].textContent).toBe('HEARING');
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-event-name'))[1].textContent).toBe('CREATED_EVENT');
        });

        it('should see John first and Gilbert second', () => {
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[0].textContent).toBe(' by John Smith');
            expect(element.nativeElement.querySelectorAll(Selector.selector('timeline-by'))[1].textContent).toBe(' by Gilbert Smith');
        });
    });
});