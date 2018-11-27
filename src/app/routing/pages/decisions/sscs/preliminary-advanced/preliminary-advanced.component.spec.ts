import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreliminaryAdvancedComponent } from './preliminary-advanced.component';

describe('PreliminaryAdvancedComponent', () => {
  let component: PreliminaryAdvancedComponent;
  let fixture: ComponentFixture<PreliminaryAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreliminaryAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreliminaryAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
