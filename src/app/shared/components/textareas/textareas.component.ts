import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationService} from '../../services/validation.service';

@Component({
    selector: 'app-textareas',
    templateUrl: './textareas.component.html',
    styleUrls: ['./textareas.component.scss']
})
/**
 * TextareasComponent
 *
 * Features:
 * If this component is told to show it's validation, and the input the user has entered is invalid,
 * then we should display a red box around the text area.
 */
export class TextareasComponent {
    @Input() group: FormGroup;
    @Input() idPrefix = 'ta';
    @Input() name = 'ta';
    @Input() rows;
    @Input() classes;
    @Input() control;
    @Input() showValidation;

    constructor(private validationService: ValidationService) {
    }

    /**
     * showValidationAndIsControlValid
     *
     * Return true if this component is required to show it's validation, and the users input is invalid.
     *
     * @param showValidation
     * @param formGroup
     * @param control
     * @return {boolean}
     */
    isControlInvalidAndShowValidation(formGroup: FormGroup, control: string, showValidation: boolean) {
        return !this.isControlValid(formGroup, control) && showValidation;
    }

    /**
     * Checks if this control is valid.
     *
     * @param formGroup
     * @param control
     * @return {boolean}
     */
    isControlValid(formGroup: FormGroup, control: string): boolean {
        return this.validationService.isControlValid(formGroup, control);
    }
}
