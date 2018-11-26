import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsMenuComponent } from './hmcts-menu.component';

describe('HmctsMenuComponent', () => {
  let component: HmctsMenuComponent;
  let fixture: ComponentFixture<HmctsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HmctsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HmctsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
