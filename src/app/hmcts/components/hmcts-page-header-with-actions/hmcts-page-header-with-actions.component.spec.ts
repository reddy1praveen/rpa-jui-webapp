import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsPageHeaderWithActionsComponent } from './hmcts-page-header-with-actions.component';

describe('HmctsPageHeaderWithActionsComponent', () => {
  let component: HmctsPageHeaderWithActionsComponent;
  let fixture: ComponentFixture<HmctsPageHeaderWithActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmctsPageHeaderWithActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmctsPageHeaderWithActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
