export interface FormGroupValidator {

    /**
     * validatorFunc - Function to validate against
     *
     * @see validation.service.ts
     */
    validatorFunc: string;

    /**
     * validationErrorId - Validation error which is thrown.
     *
     * This can be hooked into through the validationHeaderErrorMessages node within state_meta.js, to display
     * an error message at the appropriate time, within the validation header.
     * @
     */
    validationErrorId: string;

    /**
     * controlIds - The control id's required for the validation func.
     */
    controlIds: Array<string>;
}
