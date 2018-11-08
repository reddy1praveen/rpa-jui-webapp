import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationService} from '../../services/validation.service';

@Component({
    selector: 'app-validation-error-formcontrol',
    templateUrl: './validation-error-formcontrol.component.html',
    styleUrls: ['./validation-error-formcontrol.component.scss']
})

/**
 * ValidationErrorFormControlComponent
 *
 * We show an error message if the FormControl that this component links to via controlId is invalid.
 *
 * This component only shows the validation message, it does not apply the validation.
 */
export class ValidationErrorFormControlComponent {
    @Input() group: FormGroup;
    @Input() controlId;

    constructor(private validationService: ValidationService) {
    }

    /**
     * Is Form Control Valid
     *
     * TODO: Unit
     *
     * @see ValidationService
     * @param {FormGroup} formGroup
     * @param {string} controlId - ie. 'informationNeeded'
     * @return {boolean}
     */
    isFormControlValid(formGroup: FormGroup, controlId: string): boolean {
        return this.validationService.isFormControlValid(formGroup, controlId);
    }
}
