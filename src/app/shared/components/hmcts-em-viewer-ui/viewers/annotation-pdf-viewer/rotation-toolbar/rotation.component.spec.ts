import { RotationComponent } from './rotation.component';
import { EmLoggerService } from '../../../logging/em-logger.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';


describe('RotationComponent', () => {
    let component: RotationComponent;
    let fixture: ComponentFixture<RotationComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ RotationComponent ],
        providers: [
          EmLoggerService
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(RotationComponent);
      component = fixture.componentInstance;
  
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('calculateRotation', () => {

        it('should return the sum value of current rotation and new rotation', () => {
            const rotationAdd = 90;
            const rotation = component.calculateRotation(rotationAdd);
            expect(rotation).toBe(rotationAdd);
        });

        it('should return 360 degrees as 0', () => {
            const rotationAdd = 180;
            const rotation = component.calculateRotation(rotationAdd);
            expect(rotation).toBe(0);
        });

        it('should return new rotation in 360 degrees', () => {
            const rotationAdd = 270;
            const rotation = component.calculateRotation(rotationAdd);
            expect(rotation).toBe(90);
        });

        it('should return rotation in 360 degrees if negative', () => {
            const rotationSubstract = -90;
            const rotation = component.calculateRotation(rotationSubstract);
            expect(rotation).toBe(180);
        });
  });
});

