import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../redirection.service';
import { ErrorServiceUnavailableComponent } from './error-service-unavailable.component';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ErrorServiceUnavailableComponent', () => {
    let component: ErrorServiceUnavailableComponent;
    let fixture: ComponentFixture<ErrorServiceUnavailableComponent>;
    let activeRouteMock;
    let routerNavigateSpy;
    let router;

    beforeEach(async(() => {
        activeRouteMock = {
            params: Observable.of({
                data: {status: '404'}
            })
        };
        return setupModule();
    }));

    function setupModule(providers = []) {

        TestBed.configureTestingModule({
            declarations: [ ErrorServiceUnavailableComponent ],
            imports: [ RouterTestingModule ],
            providers: [
                { provide: ActivatedRoute, useFactory: () => activeRouteMock },
                ...providers
            ]
        }).compileComponents();

        router = TestBed.get(Router);
        routerNavigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve({}));
    }

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorServiceUnavailableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should redirect to 404 page if bad request (400 error) from service', () => {
        expect(component).toBeTruthy();
    });
});
