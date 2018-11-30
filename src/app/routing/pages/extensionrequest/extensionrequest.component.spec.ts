import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionrequestComponent } from './extensionrequest.component';

describe('ExtensionrequestComponent', () => {
  let component: ExtensionrequestComponent;
  let fixture: ComponentFixture<ExtensionrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
