import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovUiCustomComponent } from './gov-ui-custom.component';

describe('GovUiCustomComponent', () => {
  let component: GovUiCustomComponent;
  let fixture: ComponentFixture<GovUiCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovUiCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovUiCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
