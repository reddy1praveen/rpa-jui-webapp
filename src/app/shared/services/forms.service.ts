import {Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ValidationService} from './validation.service';

@Injectable({
    providedIn: 'root'
})
export class FormsService {
    FormControls = [];

    constructor(private validationService: ValidationService) {
    }

    /**
     * Creation of FormControls for a FormGroup.
     * So first thing is how do we add Validation to a FormControl
     *
     * prop can be a fieldset, legend, text, idPrefix, name, header, checkboxes, if we
     *
     * Here is where the validation is applied to each of the controls of the form, based on the validators that
     * have been plaed into the state_meta.js.
     *
     * TODO: Name this something totally different, as create doesn't really explain what it does,
     * also there it's quite hard to work out.
     *
     * @param someJson
     * @param someData
     */
    create(someJson, someData) {
        if (typeof someJson === 'object') {

            // Runs through the props
            // console.log('someJson');
            // console.log(someJson);

            for (const prop in someJson) {

                if (prop === 'control') {
                    // console.log('prop');
                    // console.log(prop);
                    if (someJson.radioGroup !== undefined) {

                        this.createRadioButtonControl(someJson, someData);
                    } else {
                        if (someData[someJson.control]) {

                            this.FormControls[someJson.control] = new FormControl(someData[someJson.control]);
                        } else {
                            this.createFormControl(someJson.value, someJson.control, someJson.validators);
                        }
                    }
                }
                this.create(someJson[prop], someData);
            }
        }
        if (someJson !== undefined && someJson.isArray) {
            // console.log('someJson is something');
            for (const item  of someJson) {
                this.create(someJson[item], someData);
            }
        }
    }

    /**
     * createRadioButtonControl
     *
     * Moved legacy code to this function to tidy up this service. [6th Dec 2018]
     *
     * @param someJson - TODO: Rename to help understanding of object
     * @param someData - TODO: Rename to help understanding of object
     */
    createRadioButtonControl(someJson, someData) {

        if (Object.keys(someData).length !== 0) {
            for (const radioEl of someJson.radioGroup) {
                if (radioEl.value === someData[someJson.control]) {
                    this.FormControls[someJson.control] = new FormControl(radioEl.value);
                    break;
                } else {
                    console.log('new form control without value');
                    this.createFormControl(null, someJson.control, someJson.validators);
                }
            }
        } else {
            this.createFormControl(null, someJson.control, someJson.validators);
        }
    }

    /**
     * Creates a new `FormControl` instance.
     * @param controlName - 'informationNeeded'
     * @param initialValue - ie. text if it's a textarea.
     */
    createFormControl(initialValue: any, controlName: string, validators: Array<string>) {

        if (this.validationService.controlHasValidation(validators)) {
            this.FormControls[controlName] = new FormControl(initialValue, this.validationService.getNgValidators(validators));
            return;
        }

        this.FormControls[controlName] = new FormControl(initialValue);
    }

    defineformControls(someJson: any, someData: any): any {
        this.create(someJson, someData);
        return this.FormControls;
    }
}
