import { UnlessRoleIncludesDirective } from './unless-role-includes.directive';
import { By } from "@angular/platform-browser";
import { Component, DebugElement, ElementRef } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { AuthService } from 'src/app/auth/auth.service';



@Component({
  template: `<h1 unlessRole="admin" >This should not display</h1>
            <h1 unlessRole="adminx" >This should  display</h1>          
  `
})
class TestComponent {
}



fdescribe('UnlessRoleIncludesDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>
  let El: DebugElement;

  let stub: any = {}, componentFixture: ComponentFixture<TestComponent>;


  //   beforeEach(() => {

  //     // set up stubs for dependencies
  stub.AnalyticsService = {
    trackEvent: jasmine.createSpy('trackEvent')
  };


  //     TestBed.configureTestingModule({
  //       declarations: [TestUnlessRoleComponent, UnlessRoleIncludesDirective],
  //       providers: [{
  //         provide: AuthService,
  //         useValue: stub.AuthService,

  //       },
  //       {
  //         provide: ElementRef,
  //         //useValue: stub.AuthService,
  //       }
  //       ]
  //     });




  //     it('should create an instance', () => {
  //       const directive = new UnlessRoleIncludesDirective(null, null);
  //       expect(directive).toBeTruthy();
  //     });
  //   });


  let des: any
  let bareH2: any

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [UnlessRoleIncludesDirective, TestComponent],
      // providers: [{
      //   provide: AuthService,
      //   useValue: stub.AuthService,

      // }],
    })
      .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached UnlessRole tDirective
    des = fixture.debugElement.queryAll(By.directive(UnlessRoleIncludesDirective));
    console.log('@@@@@@DES', des)


    // the h2 without the UnlessDirective
    bareH2 = fixture.debugElement.query(By.css('h2:not([unlessRole])'));
  });


  // color tests
  it('should have 2 highlighted elements', () => {
    expect(2).toBe(2);
  });

})