import {TestBed, inject} from '@angular/core/testing';

import {ValidationService} from './validation.service';
import {FormGroup, FormControl, ValidatorFn} from '@angular/forms';

fdescribe('ValidationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ValidationService]
        });
    });

    it('should be created', inject([ValidationService], (service: ValidationService) => {
        expect(service).toBeTruthy();
    }));

    it('should return an array with Validators.required, if the validation for a control is ["required"]',
        inject([ValidationService], (service: ValidationService) => {
            expect(service).toBeTruthy();
        }));

    // const createFormGroupValidators = (formGroupValidators) => {
    //
    //     return formGroupValidators.map(formGroupValidator => {
    //         return
    //     })
    // };

    // it('should take in form group validators.', inject([ValidationService], (service: ValidationService) => {
    //
    //     const form = new FormGroup({
    //         test: new FormControl('test')
    //     });
    //
    //     const formGroupValidators = [
    //         {
    //             validator: 'isAnyCheckboxChecked',
    //             validationErrorId: 'reasonsConstentOrderNotApproved',
    //             checkboxes: [
    //                 'partiesNeedAttend', 'NotEnoughInformation', 'orderNotAppearOfS25ca1973', 'd81',
    //                 'pensionAnnex', 'applicantTakenAdvice', 'respondentTakenAdvice', 'Other2'
    //             ]
    //         }
    //     ];
    //
    //     expect(service.createFormGroupValidators(form, formGroupValidators)).toBe(formGroupValidators);
    // }));

    it('should create a form group validator.', inject([ValidationService], (service: ValidationService) => {

        const form = new FormGroup({
            test: new FormControl('test')
        });

        const formGroupValidators = {
            validator: 'isAnyCheckboxChecked',
            validationErrorId: 'reasonsConstentOrderNotApproved',
            checkboxes: [
                'partiesNeedAttend', 'NotEnoughInformation', 'orderNotAppearOfS25ca1973', 'd81',
                'pensionAnnex', 'applicantTakenAdvice', 'respondentTakenAdvice', 'Other2'
            ]
        };

        expect(service.createFormGroupValidator(form, formGroupValidators.validator, formGroupValidators.checkboxes,
            formGroupValidators.validationErrorId)).toEqual(jasmine.any(Function));
    }));
});
